import { call, Effect } from "@redux-saga/core/effects";
import { selectRecordingStatus } from "../selectors";
import { waitForChange } from "./util";

export function* setRecordingBadge(): Generator<Effect, void, boolean> {
    while (true) {
        const recording = yield* waitForChange<boolean>(selectRecordingStatus);
        if (recording) {
            yield call(chrome.action.setBadgeText, { text: "REC" });
            yield call(chrome.action.setBadgeBackgroundColor, { color: "#F56D5F" });
        } else {
            yield call(chrome.action.setBadgeText, { text: "" });
        }
    }
}
