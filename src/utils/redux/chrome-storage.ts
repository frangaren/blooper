import { Storage } from "redux-persist";

class ChromeStorage implements Storage {

    #storage: chrome.storage.StorageArea;

    constructor(storage: chrome.storage.StorageArea) {
        this.#storage = storage;
    }

    async getItem(key: string): Promise<any> {
        const result = await this.#storage.get(key);
        return result[key];
    }

    setItem(key: string, value: any): Promise<void> {
        return this.#storage.set({ [key]: value });
    }

    removeItem(key: string): Promise<void> {
        return this.#storage.remove(key);
    }

}

export function createChromeLocalStorage(): Storage {
    return new ChromeStorage(chrome.storage.local);
}

export function createChromeSyncStorage(): Storage {
    return new ChromeStorage(chrome.storage.sync);
}

export function createChromeSessionStorage(): Storage {
    // @ts-ignore
    return new ChromeStorage(chrome.storage.session);
}
