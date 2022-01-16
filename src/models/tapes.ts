import { v4 as uuidv4 } from "uuid";
import { Steps } from ".";

export type Tapes = Record<string, Tape>;

export interface Tape {
    uuid: string;
    name: string;
    creationTimestamp: number;
    updateTimestamp: number;
    url: string;
    steps: Steps;
}

export function createTapes(): Record<string, Tape> {
    return {};
}

export function createTape(): Tape {
    return {
        uuid: uuidv4(),
        name: "New boop",
        creationTimestamp: Date.now(),
        updateTimestamp: Date.now(),
        url: "about:blank",
        steps: [],
    }
}
