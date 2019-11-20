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
import { logout } from 'modules/auth/actions';

import AuthLogout from 'components/Modal/Auth/AuthLogoutModal';

export default connect(
    null,
    {
        logout: logout.started
    },
    (_state, dispatch: any, props: IModalProps<void, void>) => ({
        ...props,
        onResult: (_result: void) => {
            props.onResult(undefined);
            dispatch.logout();
        }
    })
)(AuthLogout);
