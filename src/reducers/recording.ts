import { CaseReducer, createReducer } from "@reduxjs/toolkit";
import { Action, AnyAction } from "redux";
import { recordStep, startRecording, stopRecording } from "../actions";
import { createState, createTape, State, Tape } from "../models";
import { selectActiveTabId, selectActiveURL, selectIsPrivilegedTab, selectPlayingStatus, selectRecordingStatus, selectRecordingTape } from "../selectors";
import { addRecordingStep, addTape, updateRecordingStatus, updateRecordingTab, updateRecordingTape } from "../updaters";

const reduceStartRecording: CaseReducer<State> = (
    state: State,
    action: Action,
) => {
    const playing = selectPlayingStatus(state);
    const recording = selectRecordingStatus(state);
    const isPrivilegedTab = selectIsPrivilegedTab(state);
    if (!playing && !recording && !isPrivilegedTab) {
        const tabId = selectActiveTabId(state);
        const url = selectActiveURL(state);
        state = updateRecordingStatus(state, true);
        const tape = createTape();
        tape.url = url as string;
        state = updateRecordingTape(state, tape);
        state = updateRecordingTab(state, tabId);
    }
    return state;
};

const reduceStopRecording: CaseReducer<State> = (
    state: State,
    action: Action,
) => {
    // TODO: Update creationTimestamp and updateTimestamp.
    const recording = selectRecordingStatus(state);
    if (recording) {
        const tape = selectRecordingTape(state) as Tape;
        state = updateRecordingStatus(state, false);
        if (tape.steps.length > 0) {
            state = addTape(state, tape);
        }
        state = updateRecordingTape(state, undefined);
        state = updateRecordingTab(state, undefined);
    }
    return state;
};

const reduceRecordStep: CaseReducer<State> = (
    state: State,
    action: AnyAction,
) => {
    console.log("REDUCER", action.payload);
    const recording = selectRecordingStatus(state);
    if (recording) {
        state = addRecordingStep(state, action.payload.step);
    }
    return state;
};

export const reduceRecording = createReducer(createState(), builder => {
    builder
        .addCase(startRecording, reduceStartRecording)
        .addCase(stopRecording, reduceStopRecording)
        .addCase(recordStep, reduceRecordStep);
});
