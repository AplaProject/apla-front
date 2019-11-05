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

import Modal from '../';
import ModalWindow from 'containers/Modal/ModalWindow';
import Button from 'components/Button/Button';

interface Params {
    password: string;
}

class SecurityNoticeModal extends Modal<Params, boolean> {
    public static className = ' ';

    render() {
        return (
            <ModalWindow
                title="Create or Recover Account"
                width={400}
                controls={
                    <div>
                        <Button type="link" onClick={this.props.onCancel}>
                            Cancel
                        </Button>
                        <Button onClick={() => this.props.onResult(true)}>
                            Continue
                        </Button>
                    </div>
                }
            >
                <div>
                    In order to make your e-signature in the system legally
                    binding, please confirm the generated public/private keys by
                    signing with your existing LuxTrust token. Your LuxTrust
                    e-signing credentials will be sent to the LHoFT for account
                    validation purposes.
                </div>
                <div className="text-center">
                    <button
                        className="btn btn-link"
                        onClick={() => this.props.onResult(false)}
                    >
                        I don’t have a LuxTrust token
                    </button>
                </div>
            </ModalWindow>
        );
    }
}
export default SecurityNoticeModal;
