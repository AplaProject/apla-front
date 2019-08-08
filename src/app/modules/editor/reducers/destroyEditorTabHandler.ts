/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { State } from '../reducer';
import { destroyEditorTab } from '../actions';
import { Reducer } from 'modules';

const destroyEditorTabHandler: Reducer<typeof destroyEditorTab, State> = (state, payload) => ({
    ...state,
    tabIndex: state.tabIndex >= state.tabs.length - 1 ? state.tabs.length - 2 : state.tabIndex,
    tabs: [
        ...state.tabs.slice(0, payload),
        ...state.tabs.slice(payload + 1),
    ]
});

export default destroyEditorTabHandler;