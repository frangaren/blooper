import { call, select } from "@redux-saga/core/effects";
import { Effect } from "@redux-saga/types";
import { RecorderServer } from "../recorder";
import { selectRecordingStatus, selectRecordingTab } from "../selectors";
import { waitForChange } from "./util";

export function* record(
    recorder: RecorderServer
): Generator<Effect, void, boolean | number> {
    while (true) {
        const recording = (yield* waitForChange<boolean | number>(
            selectRecordingStatus,
        )) as boolean;
        if (recording) {
            console.log("START");
            const tabId = (yield select(selectRecordingTab)) as number;
            yield call(recorder.start.bind(recorder), tabId);
        } else {
            console.log("STOP");
            yield call(recorder.stop.bind(recorder));
        }
    }
}
