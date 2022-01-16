export interface Playing {
    status: boolean;
    tabId?: number;
    step?: number;
    target?: string;
};

export function createPlaying(): Playing {
    return {
        status: false,
        tabId: undefined,
        step: undefined,
        target: undefined,
    };
};
