/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as actions from './actions';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TProtypoElement } from 'apla/protypo';
import fetchNotificationsDoneHandler from './reducers/fetchNotificationsDoneHandler';
import setResizingHandler from './reducers/setResizingHandler';
import ecosystemInitHandler from './reducers/ecosystemInitHandler';
import reloadStylesheetHandler from './reducers/reloadStylesheetHandler';

export type State = {
    readonly stylesheet: string;
    readonly printStylesheet: string;
    readonly navigationResizing: boolean;
    readonly notifications: TProtypoElement[];
};

export const initialState: State = {
    stylesheet: null,
    printStylesheet: null,
    navigationResizing: false,
    notifications: null
};

export default reducerWithInitialState(initialState)
    .case(actions.ecosystemInit, ecosystemInitHandler)
    .case(actions.fetchNotifications.done, fetchNotificationsDoneHandler)
    .case(actions.setResizing, setResizingHandler)
    .case(actions.reloadStylesheet, reloadStylesheetHandler);