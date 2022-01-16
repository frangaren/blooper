import { createAction } from "@reduxjs/toolkit";
import { Step } from "../models";

export const startRecording = createAction("recording/start");
export const stopRecording = createAction("recording/stop");

interface RecordStep {
    step: Step;
}
export const recordStep = createAction<RecordStep>("recording/record-step");
