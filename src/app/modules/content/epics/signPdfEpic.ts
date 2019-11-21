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
import { signPdf } from 'modules/content/actions';
import { modalShow } from 'modules/modal/actions';

const signPdfEpic: Epic = action$ =>
    action$.ofAction(signPdf).flatMap(action => {
        const { redirect, ...relayParams } = action.payload;
        const returnUrl = action.payload.redirect
            ? new URL(window.location.href).origin + action.payload.redirect
            : window.location.href;

        return Observable.from(
            fetch('https://apla-relay-lt.now.sh/api/relayPDFProxy', {
                method: 'POST',
                body: new URLSearchParams({
                    ...relayParams,
                    returnUrl
                } as any)
            })
        )
            .flatMap(result => result.json())
            .map(data =>
                modalShow({
                    id: 'SIGN_PDF',
                    type: 'SIGN_PDF',
                    params: {
                        SAMLRequest: data.SAMLRequest,
                        RelayState: data.RelayState,
                        redirect: action.payload.redirect
                    }
                })
            )
            .catch(e => Observable.empty<never>());
    });

export default signPdfEpic;
