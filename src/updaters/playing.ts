import { State } from "../models";
import { selectPlaying } from "../selectors";

export function updatePlayingStatus(state: State, newValue: boolean): State {
    const playing = selectPlaying(state);
    playing.status = newValue;
    return state;
}

export function updatePlayingTarget(state: State, newValue?: string): State {
    const playing = selectPlaying(state);
    playing.target = newValue;
    return state;
}

export function updatePlayingTabId(state: State, newValue?: number): State {
    const playing = selectPlaying(state);
    playing.tabId = newValue;
    return state;
}

export function updatePlayingStepIndex(state: State, newValue?: number): State {
    const playing = selectPlaying(state);
    playing.step = newValue;
    return state;
}
