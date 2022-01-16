import { Tape } from "./tapes";

export interface Recording {
    status: boolean;
    tape?: Tape;
    tabId?: number;
};

export function createRecording(): Recording {
    return {
        status: false,
        tape: undefined,
        tabId: undefined,
    };
};
