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
import { IWallet, ILoginCall, ISession, IAccountContext } from 'apla/auth';
import { ICreateWalletCall, IImportWalletCall } from 'apla/auth';
import { IAccount } from 'apla/api';

const actionCreator = actionCreatorFactory('auth');
export const acquireSession = actionCreator.async<ISession, boolean>('ACQUIRE_SESSION');
export const login = actionCreator.async<ILoginCall, { privateKey: string, publicKey: string, session: ISession }, string>('LOGIN');
export const loginGuest = actionCreator.async<void, { privateKey: string, publicKey: string, wallet: IAccountContext, session: ISession }, string>('LOGIN_GUEST');
export const logout = actionCreator.async('LOGOUT');
export const inviteEcosystem = actionCreator<{ ecosystem: string, redirectPage?: string }>('INVITE_ECOSYSTEM');
export const securityProcess = actionCreator.async<string, { SAMLRequest: string, RelayState: string, privateKey: string }>('SECURITY_PROCESS');
export const accountProcess = actionCreator<{ password: string, email: string, name: string }>('ACCOUNT_PROCESS');
export const loginAccount = actionCreator.async<string, { context: IAccountContext, privateKey: string, publicKey: string, session: ISession }, string>('LOGIN_ACCOUNT');
export const createAccount = actionCreator.async<{ keys: { private: string, public: string }, password: string }, IWallet>('CREATE_ACCOUNT');
export const restoreAccount = actionCreator.async<{ privateKey: string, password: string }, IWallet>('RESTORE_ACCOUNT');
export const createWallet = actionCreator.async<ICreateWalletCall, IWallet, string>('CREATE_WALLET');
export const importWallet = actionCreator.async<IImportWalletCall, IWallet, string>('IMPORT_WALLET');
export const removeWallet = actionCreator<IWallet>('REMOVE_WALLET');
export const selectWallet = actionCreator<IAccountContext>('SELECT_WALLET');
export const switchWallet = actionCreator<{ ecosystem: string, role: string }>('SWITCH_WALLET');
export const authorize = actionCreator<string>('AUTHORIZE');
export const deauthorize = actionCreator('DEAUTHORIZE');
export const changePassword = actionCreator.async<void, { oldPassword: string, newPassword: string }, string>('CHANGE_PASSWORD');
export const loadWallets = actionCreator.async<void, IAccount[]>('LOAD_WALLETS');
export const loadWallet = actionCreator<IAccount>('LOAD_WALLET');
export const backupAccount = actionCreator('BACKUP_ACCOUNT');