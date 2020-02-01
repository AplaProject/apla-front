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

import 'rxjs';
import 'lib/external/fsa';
import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';
import debounce from 'redux-localstorage-debounce';

import { History } from 'history';
import createHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import rootReducer, { rootEpic, IRootState } from './modules';
import platform from 'lib/platform';
import dependencies from 'modules/dependencies';
import rehydrateHandler from 'modules/storage/reducers/rehydrateHandler';
import { Observable } from 'rxjs';
import { restoreAccount } from 'modules/auth/actions';

export const history = platform.select<() => History>({
    desktop: createMemoryHistory,
    web: createHistory
})();

const reducer = platform.select({
    web: compose(mergePersistedState())(rootReducer),
    desktop: rootReducer
});

const storageAdapters = [
    filter([
        'storage',
        // 'auth.isAuthenticated',
        'auth.isDefaultWallet',
        // 'auth.session',
        'auth.id',
        'auth.wallet',
        // 'engine.guestSession'
    ])
];

platform.on('web', () => {
    storageAdapters.unshift(debounce(1000, 5000));
});

const storage = compose.apply(null, storageAdapters)(
    adapter(window.localStorage)
);

const configureStore = (initialState?: IRootState) => {
    const enhancers: any[] = [];
    const middleware = [
        routerMiddleware(history),
        createEpicMiddleware(rootEpic, {
            dependencies
        })
    ];

    if (process.env.NODE_ENV === 'development') {
        const devToolsExtension = (window as { devToolsExtension?: Function })
            .devToolsExtension;

        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension());
        }
    }

    platform.on('web', () => {
        enhancers.unshift(persistState(storage, 'persistentData'));
    });

    const composedEnhancers: any = compose(
        applyMiddleware(...middleware),
        ...enhancers
    );

    return createStore<IRootState>(
        connectRouter(history)(reducer),
        initialState!,
        composedEnhancers
    );
};

const store = platform.select({
    web: () => configureStore(),
    desktop: () => {
        const Electron = require('electron');
        const storedState = Electron.ipcRenderer.sendSync('getState');
        const storeInstance =
            storedState && Object.keys(storedState).length
                ? configureStore({
                      ...storedState,
                      storage: rehydrateHandler(storedState.storage, undefined)
                  })
                : configureStore();

        storeInstance.subscribe(() => {
            const state = storeInstance.getState();
            Electron.ipcRenderer.send('setState', {
                auth: state.auth,
                engine: state.engine,
                storage: state.storage
            });
        });

        return storeInstance;
    }
})();

// This is a stub value for observable store. It will be removed in the near future
const getState$ = (stateStore: typeof store) =>
    new Observable<IRootState>(observer => {
        observer.next(stateStore.getState());

        const unsubscribe = store.subscribe(() => {
            observer.next(stateStore.getState());
        });

        return unsubscribe;
    });

export const state$ = getState$(store);

// Debug tools
(window as any).importAccount = function(privateKey: string, password: string) {
    store.dispatch(
        restoreAccount.started({
            privateKey,
            password
        })
    );
};

export default store;
