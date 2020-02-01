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
import { loginAccount } from 'modules/auth/actions';
import { IKeyInfo } from 'apla/api';

import AuthEcosystemModal from 'components/Modal/Auth/AuthEcosystemModal';

export default connect(
    null,
    {
        loginAccount: loginAccount.started
    },
    (
        _state,
        dispatch: any,
        props: IModalProps<{ password: string; keyInfo: IKeyInfo }, string>
    ) => ({
        ...props,
        onResult: (ecosystem: string) => {
            props.onResult(ecosystem);
            dispatch.loginAccount({
                password: props.params.password,
                keyInfo: props.params.keyInfo,
                ecosystem: ecosystem
            });
        }
    })
)(AuthEcosystemModal);
