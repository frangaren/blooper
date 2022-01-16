import { createAction } from "@reduxjs/toolkit";

export interface StartPlayingParams {
    target: string;
};
export const startPlaying = createAction<StartPlayingParams>("playing/start");

export const stopPlaying = createAction("playing/stop");

export interface AdvancePlayingStep {
    tabId?: number;
    stepUUID: string;
};
export const advancePlayingStep = createAction<AdvancePlayingStep>(
    "playing/step",
);
