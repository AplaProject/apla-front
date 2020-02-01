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
import { acquireSession, loginAccount } from '../actions';
import { Observable } from 'rxjs/Observable';
import keyring from 'lib/keyring';
import { push } from 'connected-react-router';

const loginAccountEpic: Epic = (action$, store, { api }) =>
    action$.ofAction(loginAccount.started).flatMap(action => {
        const account = store.getState().storage.wallets[0];
        const privateKey = keyring.decryptAES(
            account.encKey,
            action.payload.password
        );
        const state = store.getState();
        const networkEndpoint = state.engine.guestSession.network;

        if (!keyring.validatePrivateKey(privateKey)) {
            return Observable.of(
                loginAccount.failed({
                    params: action.payload,
                    error: 'E_INVALID_PASSWORD'
                })
            );
        }

        const publicKey = keyring.generatePublicKey(privateKey);
        const client = api({ apiHost: networkEndpoint.apiHost });
        const ecosystemID = action.payload.ecosystem || '1';
        const ecosystem = action.payload.keyInfo.ecosystems.find(
            l => l.ecosystem === ecosystemID
        );
        const role = (ecosystem.roles || []).length ? ecosystem.roles[0] : null;

        return (
            Observable.from(client.getUid())
                .flatMap(uid => {
                    return client.authorize(uid.token).login({
                        publicKey,
                        signature: keyring.sign(uid.uid, privateKey),
                        ecosystem: ecosystemID,
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
                            params: action.payload,
                            result: {
                                session: sessionResult,
                                privateKey,
                                publicKey,
                                context: {
                                    wallet: {
                                        ...account,
                                        address: action.payload.keyInfo.account,
                                        access:
                                            action.payload.keyInfo.ecosystems
                                    },
                                    access: ecosystem,
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
                            params: action.payload,
                            error: e.error
                        })
                    )
                )
        );
    });

export default loginAccountEpic;
