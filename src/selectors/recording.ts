import { Recording, State, Steps, Tape } from "../models";

export function selectRecording(state: State): Recording {
    return state.recording;
}

export function selectRecordingStatus(state: State): boolean {
    const recording = selectRecording(state);
    return recording.status;
}

export function selectRecordingTape(state: State): Tape | undefined {
    const recording = selectRecording(state);
    return recording.tape;
}

export function selectRecordingTab(state: State): number | undefined {
    const recording = selectRecording(state);
    return recording.tabId;
}

export function selectRecordingTapeSteps(state: State): Steps | undefined {
    const tape = selectRecordingTape(state);
    return tape?.steps;
}
