/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

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

const acquireSessionEpic: Epic = (action$, store, { api }) => action$.ofAction(acquireSession.started)
    .flatMap(action => {
        const state = store.getState();
        const client = api({
            apiHost: action.payload.network.apiHost,
            sessionToken: action.payload.sessionToken
        });

        return Observable.forkJoin(
            Observable.from(client.sections({ locale: state.storage.locale })).map(s => s.list),
            Observable.from(client.getParam({ name: 'stylesheet' })).map(p => p.value).catch(e => '')

        ).flatMap(([sections, stylesheet]) => {
            const sectionsResult: { [name: string]: ISection } = {};
            const mainSection = sections.find(l => RemoteSectionStatus.Main === l.status);
            sections.forEach(section => {
                sectionsResult[section.urlname] = {
                    name: section.urlname,
                    title: section.title,
                    defaultPage: section.page,
                    breadcrumbs: [{
                        caller: '',
                        type: 'PAGE',
                        title: section.title,
                        section: section.urlname,
                        page: section.page,
                        params: {}
                    }],
                    menus: [],
                    page: undefined
                };
            });

            return Observable.of<Action>(
                sectionsInit({
                    mainSection: mainSection ? mainSection.urlname : sections[0].urlname,
                    sections: sectionsResult
                }),
                ecosystemInit({
                    stylesheet
                }),
                fetchNotifications.started(undefined),
                acquireSession.done({
                    params: action.payload,
                    result: true
                })
            );
        }).catch(() => Observable.of(acquireSession.done({
            params: action.payload,
            result: false
        })));
    });

export default acquireSessionEpic;