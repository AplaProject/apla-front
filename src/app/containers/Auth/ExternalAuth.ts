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
import { push } from 'connected-react-router';
import { createAccount } from 'modules/auth/actions';
import keyring from 'lib/keyring';

import ExternalAuth from 'components/Auth/ExternalAuth';
import { modalShow } from 'modules/modal/actions';

const mapStateToProps = (state: IRootState) =>
    state.auth.newAccount
        ? {
              SAMLRequest: state.auth.newAccount.SAMLRequest,
              RelayState: state.auth.newAccount.RelayState,
              password: state.auth.newAccount.password,
              privateKey: state.auth.newAccount.privateKey
          }
        : {};

const mapDispatchToProps = {
    push,
    createAccount: createAccount.started,
    modalShow: modalShow
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    (state, dispatch: any) => ({
        SAMLRequest: state.SAMLRequest,
        RelayState: state.RelayState,
        onResult: (valid: boolean) => {
            dispatch.push('/');

            if (valid) {
                dispatch.createAccount({
                    keys: {
                        private: state.privateKey,
                        public: keyring.generatePublicKey(state.privateKey)
                    },
                    password: state.password
                });
            } else {
                dispatch.modalShow({
                    id: 'EXTERNAL_AUTHENTICATION_FAILURE',
                    type: 'ERROR',
                    params: {
                        value: 'User authentication failure'
                    }
                });
            }
        }
    })
)(ExternalAuth);
