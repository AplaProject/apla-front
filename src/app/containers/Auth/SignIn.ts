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
import { IRootState } from 'modules';
import { loginNetwork } from 'modules/auth/actions';

import SignIn from 'components/Auth/SignIn';

const selectNetwork = (state: IRootState) => {
    const session = state.engine.guestSession;
    if (!session) {
        return undefined;
    }

    return state.storage.networks.find(l => l.uuid === session.network.uuid);
};

const selectActivationMail = (state: IRootState) => {
    const network = selectNetwork(state);
    return network ? network.activationEmail : '';
};

const mapStateToProps = (state: IRootState) => ({
    isValidated: Boolean(
        state.auth.wallets &&
            state.auth.wallets.length &&
            state.auth.wallets[0].address
    ),
    activationEmail: selectActivationMail(state)
});

const mapDispatchToProps = {
    onLogin: loginNetwork
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
