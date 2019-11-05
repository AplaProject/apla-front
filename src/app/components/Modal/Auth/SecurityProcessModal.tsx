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

import { ModalContainer, IModalProps } from '../';
import ModalWindow from 'containers/Modal/ModalWindow';
import Button from 'components/Form/Button';

interface Params {
    keys: {
        private: string;
        public: string;
    };
    password: string;
    SAMLRequest: string;
    RelayState: string;
}

interface State {
    result?: boolean;
}

class SecurityProcessModal extends ModalContainer<
    IModalProps<Params, void>,
    State
> {
    public static className = ' ';

    state: State = {};

    componentDidMount() {
        const frame = document.getElementById('postFrame') as HTMLIFrameElement;
        const doc = frame.contentWindow.document;
        doc.open();
        doc.close();

        frame.contentDocument.body.innerHTML =
            '<form method="post" action="https://orely.luxtrust.com/FederatedServiceFrontEnd/saml/dss/req">' +
            '<input name="SAMLRequest" type="hidden" value="' +
            this.props.params.SAMLRequest +
            '"/>' +
            '<input name="RelayState" type="hidden" value="' +
            this.props.params.RelayState +
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

            this.setState({
                result
            });

            if (result) {
                this.props.onResult(null);
            }
        }
    };

    render() {
        return (
            <ModalWindow
                title="Create or Recover Account"
                width={400}
                controls={
                    <Button color="link" block onClick={this.props.onCancel}>
                        Cancel
                    </Button>
                }
            >
                {this.state.result === false && (
                    <div>User authentication failure</div>
                )}
                {undefined === this.state.result && (
                    <iframe
                        id="postFrame"
                        style={{ width: '100%', height: '400px', border: 0 }}
                    />
                )}
            </ModalWindow>
        );
    }
}
export default SecurityProcessModal;
