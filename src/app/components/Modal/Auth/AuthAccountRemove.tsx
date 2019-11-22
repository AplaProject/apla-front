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
import { IWallet } from 'apla/auth';

import Modal from '../';
import ModalWindow from 'containers/Modal/ModalWindow';
import Button from 'components/Button/Button';
import { IAccount } from 'apla/api';

interface Params {
    name: string;
    wallet: IWallet | IAccount;
}

class AuthAccountRemove extends Modal<Params, void> {
    public static className = ' ';

    render() {
        return (
            <ModalWindow
                title="Confirmation"
                width={400}
                controls={
                    <div>
                        <Button type="link" onClick={this.props.onCancel}>
                            Cancel
                        </Button>
                        <Button onClick={() => this.props.onResult(null)}>
                            Confirm
                        </Button>
                    </div>
                }
            >
                <div>Do you realy want to delete this account?</div>
                <div>
                    This action is *IRREVERSIBLE* unless you have a backup of
                    your private key
                </div>
            </ModalWindow>
        );
    }
}
export default AuthAccountRemove;
