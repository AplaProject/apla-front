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

import actionCreatorFactory from 'typescript-fsa';
import { IWallet, ISaveEncKeyCall, INetwork } from 'apla/auth';

const actionCreator = actionCreatorFactory('storage');
const actionCreatorPlugin = actionCreatorFactory('redux-localstorage');

export const localstorageInit = actionCreatorPlugin('INIT');
export const saveLocale = actionCreator<string>('SAVE_LOCALE');
export const saveNetwork = actionCreator<INetwork>('SAVE_NETWORK');
export const savePreconfiguredNetworks = actionCreator<INetwork[]>('SAVE_PRECONFIGURED_NETWORKS');
export const removeNetwork = actionCreator<string>('REMOVE_NETWORK');
export const saveWallet = actionCreator<IWallet>('SAVE_WALLET');
export const removeWallet = actionCreator<IWallet>('REMOVE_WALLET');
export const mergeFullNodes = actionCreator<{ uuid: string, fullNodes: string[] }>('MERGE_FULL_NODES');
export const saveEncKey = actionCreator<ISaveEncKeyCall>('SAVE_ENC_KEY');
export const closeSecurityWarning = actionCreator<string>('CLOSE_SECURITY_WARNING');
export const setMenuFolded = actionCreator<boolean>('SET_MENU_FOLDED');
export const replaceAccount = actionCreator<IWallet>('REPLACE_ACCOUNT');
export const removeAccounts = actionCreator('REMOVE_ACCOUNTS');