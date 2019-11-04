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
import { Observable } from 'rxjs/Observable';
import { accountProcess, createAccount } from '../actions';
import keyring from 'lib/keyring';

const accountProcessEpic: Epic = (action$, store) =>
    action$.ofAction(accountProcess).flatMap(action => {
        const seed = keyring.generateSeed();
        const keys = keyring.generateKeyPair(seed);
        const state = store.getState();

        const session = state.engine.guestSession;

        if (!session) {
            return Observable.empty();
        }

        const network = state.storage.networks.find(
            l => l.uuid === session.network.uuid
        );

        if (!network) {
            return Observable.empty();
        }

        const form = new URLSearchParams();
        form.append('pub', keys.public);
        form.append('email', action.payload.email);
        form.append('name', action.payload.name);

        return Observable.from(
            fetch(network.activationUrl, {
                method: 'post',
                body: form
            })
        )
            .map(() =>
                createAccount.started({
                    keys,
                    password: action.payload.password
                })
            )
            .catch(e => Observable.empty<never>());
    });

export default accountProcessEpic;
