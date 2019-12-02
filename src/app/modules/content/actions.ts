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
import { TProtypoElement, IButtonInteraction } from 'apla/protypo';

const actionCreator = actionCreatorFactory('content');

// Navigation
export const ecosystemInit = actionCreator<{ stylesheet: string, printStylesheet: string }>('ECOSYSTEM_INIT');
export const setMenuActive = actionCreator<boolean>('SET_MENU_ACTIVE');

// Interaction
export const buttonInteraction = actionCreator.async<IButtonInteraction, void>('BUTTON_INTERACTION');
export const displayData = actionCreator.async<string, string, string>('DISPLAY_DATA');
export const signPdf = actionCreator<{
    name: string;
    account: string;
    meetingID: string;
    company: string;
    address: string;
    address2: string;
    proxy: string;
    location: string;
    date: string;
    signature: string;
    redirect?: string;
}>('SIGN_PDF');
export const signResultPdf = actionCreator<{
    name: string;
    account: string;
    meetingID: string;
    meeting: string;
    meeting2: string;
    company: string;
    address: string;
    address2: string;
    location: string;
    date: string;
    signature: string;
    qa: { q: string, a: string }[];
}>('SIGN_RESULT_PDF');
export const signProtocol = actionCreator<{
    binaryID: string;
    meetingID: string;
}>('SIGN_PROTOCOL');

// Notifications
export const fetchNotifications = actionCreator.async<void, TProtypoElement[], void>('FETCH_NOTIFICATIONS');

export const reloadStylesheet = actionCreator<string>('RELOAD_STYLESHEET');