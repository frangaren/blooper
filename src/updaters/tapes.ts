import { State, Tape } from "../models";
import { selectTape, selectTapes } from "../selectors";

export function updateTapes(
    state: State,
    newValue: Record<string, Tape>
): State {
    state.tapes = newValue;
    return state;
}

export function addTape(
    state: State,
    newValue: Tape,
): State {
    const tapes = selectTapes(state);
    tapes[newValue.uuid] = newValue;
    return state;
}

export function deleteTape(
    state: State,
    uuid: string,
): State {
    const tapes = selectTapes(state);
    delete tapes[uuid];
    return state;
}

export function renameTape(
    state: State,
    uuid: string,
    name: string,
): State {
    const tape = selectTape(uuid)(state);
    if (tape !== undefined) {
        tape.name = name;
    }
    return state;
}
