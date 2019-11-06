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

import React from 'react';
import Hint from 'components/Form/Hint';

interface Props {
    SAMLRequest: string;
    RelayState: string;
    onResult: (valid: boolean) => void;
}

class ExternalAuth extends React.Component<Props> {
    private _container: HTMLDivElement;

    componentWillReceiveProps(props: Props) {
        if (
            !this.props.SAMLRequest &&
            props.SAMLRequest &&
            this.props.SAMLRequest !== props.SAMLRequest
        ) {
            this.updateFrame(props.SAMLRequest, props.RelayState);
        }
    }

    updateFrame(request: string, state: string) {
        const frame = document.createElement('iframe');
        frame.style.width = '100%';
        frame.style.height = '400px';
        frame.style.border = '0';

        while (this._container.hasChildNodes()) {
            this._container.removeChild(this._container.childNodes[0]);
        }

        this._container.appendChild(frame);

        const doc = frame.contentWindow.document;
        doc.open();
        doc.close();

        frame.contentDocument.body.innerHTML =
            '<form method="post" action="https://orely.luxtrust.com/FederatedServiceFrontEnd/saml/dss/req">' +
            '<input name="SAMLRequest" type="hidden" value="' +
            request +
            '"/>' +
            '<input name="RelayState" type="hidden" value="' +
            state +
            '"/>' +
            '<input id="sendForm" type="submit" value="Send" style="position:absolute;top:-999999px;left:-999999px"/>' +
            '</form>';

        const sendButton = frame.contentDocument.getElementById('sendForm');
        sendButton.click();

        window.addEventListener('message', this.handleMessage);
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.handleMessage);
    }

    handleMessage = (event: any) => {
        if (
            event.data &&
            'luxtrust_result' === event.data.type &&
            'xml' === event.data.operation
        ) {
            const result = 'true' === event.data.data;
            this.props.onResult(result);
        }
    };

    render() {
        return (
            <div>
                <div ref={l => (this._container = l)}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Hint>Loading...</Hint>
                    </div>
                </div>
            </div>
        );
    }
}
export default ExternalAuth;
