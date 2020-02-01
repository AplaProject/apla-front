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
import { loginAccount, loginNetwork } from '../actions';
import { Observable } from 'rxjs/Observable';
import keyring from 'lib/keyring';
import { modalShow } from 'modules/modal/actions';

const loginNetworkEpic: Epic = (action$, store, { api }) =>
    action$.ofAction(loginNetwork).flatMap(action => {
        const account = store.getState().storage.wallets[0];
        const privateKey = keyring.decryptAES(account.encKey, action.payload);
        const state = store.getState();
        const networkEndpoint = state.engine.guestSession.network;
        const client = api({ apiHost: networkEndpoint.apiHost });

        if (!keyring.validatePrivateKey(privateKey)) {
            return Observable.of(
                modalShow({
                    id: 'AUTH_ERROR',
                    type: 'AUTH_ERROR',
                    params: {
                        error: 'E_INVALID_PASSWORD'
                    }
                })
            );
        }

        return Observable.from(client.keyinfo({ id: account.id })).map(
            keyInfo =>
                keyInfo.ecosystems.length > 1
                    ? modalShow({
                          id: 'AUTH_ECOSYSTEM',
                          type: 'AUTH_ECOSYSTEM',
                          params: {
                              password: action.payload,
                              keyInfo
                          }
                      })
                    : loginAccount.started({
                          password: action.payload,
                          keyInfo
                      })
        );
    });

export default loginNetworkEpic;
