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

import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from './actions';
import { IWallet, INetwork } from 'apla/auth';
import saveLocaleHandler from './reducers/saveLocaleHandler';
import saveWalletHandler from './reducers/saveWalletHandler';
import removeWalletHandler from './reducers/removeWalletHandler';
import mergeFullNodesHandler from './reducers/mergeFullNodesHandler';
import closeSecurityWarningHandler from './reducers/closeSecurityWarningHandler';
import saveNetworkHandler from './reducers/saveNetworkHandler';
import removeNetworkHandler from './reducers/removeNetworkHandler';
import savePreconfiguredNetworksHandler from './reducers/savePreconfiguredNetworksHandler';
import rehydrateHandler from './reducers/rehydrateHandler';
import setMenuFoldedHandler from './reducers/setMenuFoldedHandler';
import replaceAccountHandler from './reducers/replaceAccountHandler';
import removeAccountsHandler from './reducers/removeAccountsHandler';

export type State = {
    readonly locale: string;
    readonly wallets: IWallet[];
    readonly networks: INetwork[];
    readonly securityWarningClosed: boolean;
    readonly menuFolded: boolean;
};

export const initialState: State = {
    locale: null,
    wallets: [],
    networks: [],
    securityWarningClosed: false,
    menuFolded: false
};

export default reducerWithInitialState<State>(initialState)
    .case(actions.saveLocale, saveLocaleHandler)
    .case(actions.saveWallet, saveWalletHandler)
    .case(actions.removeWallet, removeWalletHandler)
    .case(actions.mergeFullNodes, mergeFullNodesHandler)
    .case(actions.closeSecurityWarning, closeSecurityWarningHandler)
    .case(actions.saveNetwork, saveNetworkHandler)
    .case(actions.removeNetwork, removeNetworkHandler)
    .case(actions.savePreconfiguredNetworks, savePreconfiguredNetworksHandler)
    .case(actions.localstorageInit, rehydrateHandler)
    .case(actions.setMenuFolded, setMenuFoldedHandler)
    .case(actions.replaceAccount, replaceAccountHandler)
    .case(actions.removeAccounts, removeAccountsHandler);
