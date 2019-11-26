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

import { IRootState } from 'modules';
import { connect } from 'react-redux';
import { logout, changePassword, switchWallet, backupAccount } from 'modules/auth/actions';
import { modalShow } from 'modules/modal/actions';

import UserMenu from 'components/Main/Header/UserMenu';

const mapStateToProps = (state: IRootState) => ({
    isDefaultWallet: state.auth.isDefaultWallet,
    memberName: state.auth.memberName,
    wallet: state.auth.wallet,
    walletEcosystems: ((state.auth.wallet && state.auth.wallet.wallet && state.auth.wallets) ? (state.auth.wallets.find(l => l.id === state.auth.wallet.wallet.id) || { access: [] }).access : []).sort((a, b) => Number(a.ecosystem) - Number(b.ecosystem))
});

export default connect<any, any, any>(mapStateToProps, {
    onLogout: () => logout.started(null),
    onSwitchEcosystem: (ecosystem: string, defaultRole?: boolean) => defaultRole
        ? switchWallet({
            ecosystem,
            role: null
        })
        : modalShow({
            id: 'ROLE_PICKER',
            type: 'ROLE_PICKER',
            params: {
                ecosystem
            }
        }),
    onBackup: () => backupAccount(),
    onChangePassword: () => changePassword.started(null)

})(UserMenu);