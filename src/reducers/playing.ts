import { CaseReducer, createReducer } from "@reduxjs/toolkit";
import { Action, AnyAction } from "redux";
import { advancePlayingStep, startPlaying, stopPlaying } from "../actions";
import { createState, State, Step } from "../models";
import { selectActiveTabId, selectPlayingStatus, selectPlayingStep, selectPlayingStepIndex, selectPlayingTabId, selectPlayingTapeLength, selectRecordingStatus } from "../selectors";
import { updatePlayingStatus, updatePlayingStepIndex, updatePlayingTabId, updatePlayingTarget } from "../updaters";

const reduceStartPlaying: CaseReducer<State> = (
    state: State,
    action: AnyAction,
) => {
    const playing = selectPlayingStatus(state);
    const recording = selectRecordingStatus(state);
    if (!playing && !recording) {
        const tabId = selectActiveTabId(state);
        state = updatePlayingStatus(state, true);
        state = updatePlayingTarget(state, action.payload.target);
        state = updatePlayingTabId(state, tabId);
        state = updatePlayingStepIndex(state, 0);
    }
    return state;
};

const reduceStopPlaying: CaseReducer<State> = (
    state: State,
    action: Action,
) => {
    const playing = selectPlayingStatus(state);
    if (playing) {
        state = updatePlayingStatus(state, false);
        state = updatePlayingTarget(state, undefined);
        state = updatePlayingTabId(state, undefined);
        state = updatePlayingStepIndex(state, undefined);
    }
    return state;
};

const reduceAdvancePlayingStep: CaseReducer<State> = (
    state: State,
    action: AnyAction,
) => {
    const playing = selectPlayingStatus(state);
    const tabId = selectPlayingTabId(state);
    const step = selectPlayingStep(state) as Step;
    if (playing && tabId === action.payload.tabId && step.uuid === action.payload.stepUUID) {
        const stepIndex = selectPlayingStepIndex(state) as number;
        const tapeLength = selectPlayingTapeLength(state) as number;
        if (stepIndex + 1 < tapeLength) {
            state = updatePlayingStepIndex(state, stepIndex + 1);
        } else {
            state = updatePlayingStatus(state, false);
            state = updatePlayingTarget(state, undefined);
            state = updatePlayingTabId(state, undefined);
            state = updatePlayingStepIndex(state, undefined);
        }
    }
    return state;
};

export const reducePlaying = createReducer(createState(), builder => {
    builder
        .addCase(startPlaying, reduceStartPlaying)
        .addCase(stopPlaying, reduceStopPlaying)
        .addCase(advancePlayingStep, reduceAdvancePlayingStep);
});
