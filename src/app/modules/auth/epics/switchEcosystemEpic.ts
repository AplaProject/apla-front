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

import { Epic } from 'modules';
import { switchEcosystem, loginAccount, acquireSession } from '../actions';
import { Observable } from 'rxjs/Observable';
import { txAuthorize } from 'modules/tx/actions';
import { isType } from 'typescript-fsa';
import keyring from 'lib/keyring';
import { Action } from 'redux';
import { push } from 'connected-react-router';

const switchEcosystemEpic: Epic = (action$, store, { api }) =>
    action$.ofAction(switchEcosystem).flatMap(rootAction =>
        Observable.if(
            () => !!store.getState().auth.privateKey,
            Observable.defer(() => Observable.of(rootAction)),
            Observable.merge(
                Observable.of(txAuthorize.started({})),
                action$
                    .filter(
                        l =>
                            txAuthorize.done.match(l) ||
                            txAuthorize.failed.match(l)
                    )
                    .take(1)
                    .flatMap(result =>
                        Observable.if(
                            () => isType(result, txAuthorize.done),
                            Observable.defer(() => Observable.of(rootAction)),
                            Observable.empty<never>()
                        )
                    )
            )
        ).flatMap(action => {
            if (!isType(action, switchEcosystem)) {
                return Observable.of(action);
            }

            const state = store.getState();
            const account = state.storage.wallets[0];
            const privateKey = state.auth.privateKey;
            const networkEndpoint = state.engine.guestSession.network;

            if (!keyring.validatePrivateKey(privateKey)) {
                return Observable.of(
                    loginAccount.failed({
                        params: '',
                        error: 'E_INVALID_PASSWORD'
                    })
                );
            }

            const publicKey = keyring.generatePublicKey(privateKey);
            const client = api({
                apiHost: networkEndpoint.apiHost
            });

            return Observable.from(client.keyinfo({ id: account.id })).flatMap(
                keyInfo => {
                    const loginEcosystem = (keyInfo.ecosystems || []).find(
                        e => String(action.payload) === e.ecosystem
                    );
                    if (!loginEcosystem) {
                        return Observable.of(
                            loginAccount.failed({
                                params: '',
                                error: 'E_INVALID_PASSWORD'
                            })
                        );
                    }

                    const role = (loginEcosystem.roles || []).length
                        ? loginEcosystem.roles[0]
                        : null;

                    return (
                        Observable.from(client.getUid())
                            .flatMap(uid => {
                                return client.authorize(uid.token).login({
                                    publicKey,
                                    signature: keyring.sign(
                                        uid.uid,
                                        privateKey
                                    ),
                                    ecosystem: String(action.payload),
                                    expire: 60 * 60 * 24 * 90,
                                    role: role ? Number(role.id) : null
                                });
                            })

                            // Successful authentication. Yield the result
                            .flatMap(response => {
                                const sessionResult = {
                                    sessionToken: response.token,
                                    network: networkEndpoint
                                };

                                return Observable.of<Action>(
                                    push('/'),
                                    loginAccount.done({
                                        params: '',
                                        result: {
                                            session: sessionResult,
                                            privateKey,
                                            publicKey,
                                            context: {
                                                wallet: {
                                                    ...account,
                                                    address: keyInfo.account,
                                                    access: keyInfo.ecosystems
                                                },
                                                access: loginEcosystem,
                                                role
                                            }
                                        }
                                    }),
                                    acquireSession.started(sessionResult)
                                );
                            })
                            // Catch actual login error, yield result
                            .catch(e =>
                                Observable.of(
                                    loginAccount.failed({
                                        params: '',
                                        error: e.error
                                    })
                                )
                            )
                    );
                }
            );
        })
    );

export default switchEcosystemEpic;
