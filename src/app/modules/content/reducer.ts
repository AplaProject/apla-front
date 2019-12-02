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

import * as actions from './actions';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TProtypoElement } from 'apla/protypo';
import fetchNotificationsDoneHandler from './reducers/fetchNotificationsDoneHandler';
import ecosystemInitHandler from './reducers/ecosystemInitHandler';
import reloadStylesheetHandler from './reducers/reloadStylesheetHandler';
import setMenuActiveHandler from './reducers/setMenuActiveHandler';
import buttonInteractionHandler from './reducers/buttonInteractionHandler';
import buttonInteractionDoneHandler from './reducers/buttonInteractionDoneHandler';

export type State = {
    readonly stylesheet: string;
    readonly printStylesheet: string;
    readonly notifications: TProtypoElement[];
    readonly menuActive: boolean;
    readonly pending: boolean;
};

export const initialState: State = {
    stylesheet: null,
    printStylesheet: null,
    notifications: null,
    menuActive: false,
    pending: false
};

export default reducerWithInitialState(initialState)
    .case(actions.ecosystemInit, ecosystemInitHandler)
    .case(actions.fetchNotifications.done, fetchNotificationsDoneHandler)
    .case(actions.reloadStylesheet, reloadStylesheetHandler)
    .case(actions.setMenuActive, setMenuActiveHandler)
    .case(actions.buttonInteraction.started, buttonInteractionHandler)
    .case(actions.buttonInteraction.done, buttonInteractionDoneHandler);
