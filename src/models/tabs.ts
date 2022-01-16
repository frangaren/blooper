export interface Tab {
    id?: number;
    url?: string;
};

export function createTab(): Tab {
    return {
        id: -1,
        url: "about:blank",
    };
};


export interface Tabs {
    active?: Tab;
};

export function createTabs(): Tabs {
    return {
        active: undefined,
    };
};
