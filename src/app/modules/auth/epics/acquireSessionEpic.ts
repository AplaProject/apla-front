// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

import { Action } from 'redux';
import { Epic } from 'modules';
import { acquireSession } from '../actions';
import { ISection } from 'apla/content';
import { sectionsInit } from 'modules/sections/actions';
import { fetchNotifications, ecosystemInit } from 'modules/content/actions';
import { Observable } from 'rxjs';

enum RemoteSectionStatus {
    Removed = '0',
    Default = '1',
    Main = '2'
}

const acquireSessionEpic: Epic = (action$, store, { api }) =>
    action$.ofAction(acquireSession.started).flatMap(action => {
        const state = store.getState();
        const client = api({
            apiHost: action.payload.network.apiHost,
            sessionToken: action.payload.sessionToken
        });

        return Observable.forkJoin(
            Observable.from(
                client.sections({ locale: state.storage.locale })
            ).map(s => s.list),
            Observable.from(client.getParam({ name: 'stylesheet' }))
                .map(p => p.value)
                .catch(e => Observable.of('')),
            Observable.from(client.getParam({ name: 'print_stylesheet' }))
                .map(p => p.value)
                .catch(e => Observable.of('')),
            Observable.from(
                client.getRowQuery({
                    table: 'members',
                    columns: ['member_info'],
                    column: 'account',
                    value: state.auth.wallet.wallet.address
                })
            ).map(
                memberInfo =>
                    JSON.parse(memberInfo.value.member_info).personal_name ||
                    state.auth.wallet.wallet.address
            ).catch(e => Observable.of(state.auth.wallet.wallet.address))
        )
            .flatMap(([sections, stylesheet, printStylesheet, memberName]) => {
                const sectionsResult: { [name: string]: ISection } = {};
                const mainSection = sections.find(
                    l => RemoteSectionStatus.Main === l.status
                );

                sections.forEach((section, index) => {
                    sectionsResult[section.urlname] = {
                        index,
                        name: section.urlname,
                        title: section.title,
                        defaultPage: section.page,
                        breadcrumbs: [
                            {
                                caller: '',
                                type: 'PAGE',
                                title: section.title,
                                section: section.urlname,
                                page: section.page,
                                params: {}
                            }
                        ],
                        menus: [],
                        page: undefined
                    };
                });

                return Observable.of<Action>(
                    sectionsInit({
                        mainSection: mainSection
                            ? mainSection.urlname
                            : sections[0].urlname,
                        sections: sectionsResult
                    }),
                    ecosystemInit({
                        stylesheet,
                        printStylesheet
                    }),
                    fetchNotifications.started(undefined),
                    acquireSession.done({
                        params: action.payload,
                        result: {
                            acquired: true,
                            memberName
                        }
                    })
                );
            })
            .catch(e =>
                Observable.of(
                    acquireSession.done({
                        params: action.payload,
                        result: {
                            acquired: false,
                            memberName: ''
                        }
                    })
                )
            );
    });

export default acquireSessionEpic;
