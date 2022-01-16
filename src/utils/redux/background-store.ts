import { Action, AnyAction, createStore, Observable, Observer, Reducer, Store, StoreEnhancer, Unsubscribe } from "redux";

class BackgroundStore<
    S = any,
    A extends Action = AnyAction,
    > implements Store<S, A> {

    #port: chrome.runtime.Port;
    #state: S;
    #listeners: Set<() => void>;

    constructor(port: chrome.runtime.Port, initialState: S) {
        this.dispatch = this.dispatch.bind(this);
        this.#port = port;
        this.#state = initialState;
        this.#listeners = new Set()
        this._onBackgroundStateUpdate =
            this._onBackgroundStateUpdate.bind(this);
        this.#port.onMessage.addListener(
            this._onBackgroundStateUpdate
        );
        this.#port.onDisconnect.addListener(this.dispose.bind(this));
    }

    _onBackgroundStateUpdate(state: S) {
        this.#state = state;
        for (const listener of this.#listeners) {
            listener();
        }
    }

    dispose(): void {
        this.#port.onMessage.removeListener(
            this._onBackgroundStateUpdate
        );
        this.#listeners.clear();
    }

    dispatch<T extends A>(action: T): T {
        this.#port.postMessage(action);
        return action;
    }

    getState(): S {
        return this.#state;
    }

    subscribe(listener: () => void): Unsubscribe {
        this.#listeners.add(listener);
        return () => { this.#listeners.delete(listener) }
    }

    replaceReducer(_: Reducer<S, A>): void {
        throw Error("Cannot replace the reducer on a BackgroundStore.");
    }

    [Symbol.observable](): Observable<S> {
        const subscribeToStore = this.subscribe.bind(this);
        const getStoreState = this.getState.bind(this);
        return {
            subscribe(
                observer: Observer<S | undefined>
            ): { unsubscribe: Unsubscribe } {
                if (observer.next) {
                    observer.next(getStoreState());
                }
                const unsubscribe = subscribeToStore(() => {
                    if (observer.next) {
                        observer.next(getStoreState());
                    }
                });
                return { unsubscribe };
            },

            [Symbol.observable](): Observable<S | undefined> {
                return this;
            }
        }
    }

}

export function createBackgroundStoreClient<
    S = any,
    A extends Action = AnyAction,
    >(
        initialState: S,
        portName: string = "redux-background-store",
): Store<S, A> {
    const port = chrome.runtime.connect({
        name: portName,
    });
    return new BackgroundStore<S, A>(port, initialState);
}

export function initializeBackgroundStoreServer<
    S = any,
    A extends Action = AnyAction,
    >(
        store: Store<S, A>,
        portName: string = "redux-background-store",
): Store<S, A> {
    chrome.runtime.onConnect.addListener(port => {
        if (port.name === portName) {
            port.onMessage.addListener(action => store.dispatch(action));
            port.postMessage(store.getState());
            const unsuscribe = store.subscribe(
                () => port.postMessage(store.getState())
            );
            port.onDisconnect.addListener(unsuscribe);
        }
    });
    return store;
}

export function createBackgroundStoreServer<
    S = any,
    A extends Action = AnyAction,
    >(
        reducer: Reducer<S, A>,
        enhancer?: StoreEnhancer,
        portName: string = "redux-background-store",
): Store<S, A> {
    const store = createStore(reducer, enhancer);
    return initializeBackgroundStoreServer(store, portName);
}
