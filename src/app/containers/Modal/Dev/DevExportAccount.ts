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

import { connect } from 'react-redux';
import { IModalProps } from 'components/Modal';
import { IRootState } from 'modules';
import { modalShow } from 'modules/modal/actions';
import keyring from 'lib/keyring';

import DevExportAccount from 'components/Modal/Dev/DevExportAccount';

export default connect(
    (state: IRootState) => ({
        account: state.storage.wallets[0]
    }),
    {
        modalShow
    },
    (state, dispatch: any, props: IModalProps<void, string>) => ({
        ...props,
        onResult: (password: string) => {
            if (!state.account) {
                return props.onResult(null);
            } else {
                const privateKey = keyring.decryptAES(
                    state.account.encKey,
                    password
                );

                if (keyring.validatePrivateKey(privateKey)) {
                    dispatch.modalShow({
                        id: 'DEV_EXPORT_RESULT',
                        type: 'DEV_EXPORT_RESULT',
                        params: {
                            privateKey
                        }
                    });
                } else {
                    props.onResult(null);
                }
            }
        }
    })
)(DevExportAccount);
