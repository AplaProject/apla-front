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
import { securityProcess } from '../actions';
import keyring from 'lib/keyring';

const securityProcessEpic: Epic = action$ =>
    action$.ofAction(securityProcess.started).flatMap(action => {
        const seed = keyring.generateSeed();
        const keys = keyring.generateKeyPair(seed);

        return Observable.from(
            fetch(
                'https://lt-relay.saurer.now.sh/api/relay.js?data=' +
                    keys.public
            )
        )
            .flatMap(result => result.json())
            .map(data =>
                securityProcess.done({
                    params: action.payload,
                    result: {
                        SAMLRequest: data.SAMLRequest,
                        RelayState: data.RelayState,
                        privateKey: keys.private
                    }
                })
            )
            .catch(e => Observable.empty<never>());
    });

export default securityProcessEpic;
