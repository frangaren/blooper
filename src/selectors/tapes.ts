import { State, Tape } from "../models";

export function selectTapes(state: State): Record<string, Tape> {
    return state.tapes;
}

export function selectTape(uuid: string): (state: State) => Tape | undefined {
    return function (state: State): Tape {
        const tapes = selectTapes(state);
        return tapes[uuid];
    }
}
