import { applyMiddleware, createStore, Store } from "redux";
import { persistStore } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import createSagaMiddleware from "redux-saga";
import { setActiveTab, setTabURL } from "./actions";
import { PlayerServer } from "./player/player";
import { RecorderServer } from "./recorder";
import { rootReducer } from "./reducers";
import { rootSaga } from "./sagas";
import { initializeBackgroundStoreServer } from "./utils/redux/background-store";
import { createChromeLocalStorage } from "./utils/redux/chrome-storage";

export function initialize() {
    const storage = createChromeLocalStorage();
    let persistedReducer = persistReducer(
        {
            key: 'root',
            storage,
            whitelist: ['tapes']
        },
        rootReducer,
    )
    const saga = createSagaMiddleware()
    const store = createStore(
        persistedReducer,
        applyMiddleware(saga),
    );
    const persistor = persistStore(store);
    const unsuscribe = persistor.subscribe(() => {
        const { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            unsuscribe();
            initializeBackgroundStoreServer(store);
        }
    });
    return { store, persistor, saga };
};

function registerActiveTab(store: Store): void {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        store.dispatch(setActiveTab({
            id: tabs[0].id,
            url: tabs[0].url,
        }));
    });

    chrome.tabs.onActivated.addListener(info => {
        store.dispatch(setActiveTab({
            id: info.tabId,
            url: undefined,
        }));
        chrome.tabs.get(info.tabId).then(tab => {
            store.dispatch(setTabURL({
                id: tab.id,
                url: tab.url,
            }));
        });
    });

    chrome.tabs.onUpdated.addListener((_id, _info, tab) => {
        store.dispatch(setTabURL({
            id: tab.id,
            url: tab.url,
        }));
    });
}

const { store, persistor, saga } = initialize();

registerActiveTab(store);

const recorder = new RecorderServer(store.dispatch);
const player = new PlayerServer(store.dispatch);

saga.run(rootSaga, recorder, player);
