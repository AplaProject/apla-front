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

import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import Modal from '../';
import ModalWindow from 'containers/Modal/ModalWindow';
import Button from 'components/Form/Button';

export interface IAuthErrorModalProps {
    error: string;
    message: string;
}

class AuthErrorModal extends Modal<IAuthErrorModalProps, void> {
    public static className = ' ';

    render() {
        return (
            <ModalWindow
                title={
                    <FormattedMessage id="alert.error" defaultMessage="Error" />
                }
                width={300}
                controls={
                    <Button type="button" block onClick={this.props.onCancel}>
                        <FormattedMessage id="close" defaultMessage="Close" />
                    </Button>
                }
            >
                <p>
                    <FormattedMessage
                        id={`auth.error.${this.props.params.error}`}
                        defaultMessage={this.props.params.message}
                    />
                </p>
            </ModalWindow>
        );
    }
}
export default AuthErrorModal;
