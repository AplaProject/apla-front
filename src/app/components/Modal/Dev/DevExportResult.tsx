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
import { FormattedMessage } from 'react-intl';
import { sendAttachment } from 'lib/fs';
import CopyToClipboard from 'react-copy-to-clipboard';
import { publicToID } from 'lib/crypto';

import Modal from '../';
import ModalWindow from 'containers/Modal/ModalWindow';
import Button from 'components/Form/Button';
import Info from 'components/Typo/Info';
import keyring from 'lib/keyring';

interface Props {
    privateKey: string;
}

class DevExportResult extends Modal<Props, void> {
    public static className = ' ';

    onKeyDownload = () => {
        const publicKey = keyring.generatePublicKey(
            this.props.params.privateKey
        );
        const keyID = publicToID(publicKey);
        sendAttachment(`${keyID}.txt`, this.props.params.privateKey);
    };

    handleCopy = () => {
        this.props.notify('COPIED_TO_CLIPBOARD', {});
    };

    render() {
        const publicKey = keyring.generatePublicKey(
            this.props.params.privateKey
        );
        const keyID = publicToID(publicKey);

        return (
            <ModalWindow
                title="Export account"
                controls={
                    <>
                        <Button
                            block
                            color="link"
                            onClick={this.props.onCancel}
                        >
                            <FormattedMessage
                                id="close"
                                defaultMessage="Close"
                            />
                        </Button>
                        <Button block onClick={this.onKeyDownload}>
                            <FormattedMessage
                                id="general.download.asfile"
                                defaultMessage="Download as file"
                            />
                        </Button>
                    </>
                }
            >
                <Info title="Private Key" icon="fa fa-key">
                    <div>{this.props.params.privateKey}</div>
                    <div style={{ textAlign: 'right' }}>
                        <CopyToClipboard
                            text={this.props.params.privateKey}
                            onCopy={this.handleCopy}
                        >
                            <Button slim icon="fa fa-files-o">
                                Copy To Clipboard
                            </Button>
                        </CopyToClipboard>
                    </div>
                </Info>

                <Info title="Public Key" icon="fa fa-key">
                    {publicKey}
                </Info>

                <Info title="Key ID" icon="fa fa-credit-card">
                    {keyID}
                </Info>
            </ModalWindow>
        );
    }
}
export default DevExportResult;
