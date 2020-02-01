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

import { combineEpics } from 'redux-observable';
import loginEpic from './epics/loginEpic';
import logoutEpic from './epics/logoutEpic';
import authorizeEpic from './epics/authorizeEpic';
import createWalletEpic from './epics/createWalletEpic';
import importWalletEpic from './epics/importWalletEpic';
import authErrorEpic from './epics/authErrorEpic';
import removeWalletEpic from './epics/removeWalletEpic';
import logoutEmptySessionEpic from './epics/logoutEmptySessionEpic';
import changePasswordEpic from './epics/changePasswordEpic';
import changePasswordDoneEpic from './epics/changePasswordDoneEpic';
import loadWalletsEpic from './epics/loadWalletsEpic';
import reloadWalletsEpic from './epics/reloadWalletsEpic';
import loadSavedWalletEpic from './epics/loadSavedWalletEpic';
import switchWalletEpic from './epics/switchWalletEpic';
import loginGuestEpic from './epics/loginGuestEpic';
import acquireSessionEpic from './epics/acquireSessionEpic';
import backupAccountEpic from './epics/backupAccountEpic';
import createAccountEpic from './epics/createAccountEpic';
import restoreAccountEpic from './epics/restoreAccountEpic';
import loginAccountEpic from './epics/loginAccountEpic';
import securityProcessEpic from './epics/securityProcessEpic';
import accountProcessEpic from './epics/accountProcessEpic';
import switchEcosystemEpic from './epics/switchEcosystemEpic';

export default combineEpics(
    acquireSessionEpic,
    authorizeEpic,
    createWalletEpic,
    importWalletEpic,
    loginEpic,
    authErrorEpic,
    logoutEmptySessionEpic,
    logoutEpic,
    removeWalletEpic,
    loadWalletsEpic,
    loadSavedWalletEpic,
    reloadWalletsEpic,
    changePasswordEpic,
    changePasswordDoneEpic,
    switchWalletEpic,
    loginGuestEpic,
    backupAccountEpic,
    createAccountEpic,
    restoreAccountEpic,
    loginAccountEpic,
    securityProcessEpic,
    accountProcessEpic,
    switchEcosystemEpic
);
