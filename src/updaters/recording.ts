import { Recording, State, Step, Tape } from "../models";
import { selectRecording, selectRecordingTapeSteps } from "../selectors";

export function updateRecording(state: State, newValue: Recording): State {
    state.recording = newValue;
    return state;
}

export function updateRecordingStatus(state: State, newValue: boolean): State {
    const recording = selectRecording(state);
    recording.status = newValue;
    return state;
}

export function updateRecordingTape(state: State, newValue?: Tape): State {
    const recording = selectRecording(state);
    recording.tape = newValue;
    return state;
}

export function updateRecordingTab(state: State, newValue?: number): State {
    const recording = selectRecording(state);
    recording.tabId = newValue;
    return state;
}

export function addRecordingStep(state: State, newValue: Step): State {
    const steps = selectRecordingTapeSteps(state);
    steps?.push(newValue);
    return state;
}
