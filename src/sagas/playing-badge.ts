import { call, Effect } from "@redux-saga/core/effects";
import { selectPlayingStatus } from "../selectors";
import { waitForChange } from "./util";

export function* setPlayingBadge(): Generator<Effect, void, boolean> {
    while (true) {
        const playing = yield* waitForChange<boolean>(selectPlayingStatus);
        if (playing) {
            yield call(chrome.action.setBadgeText, { text: "▸" });
            yield call(chrome.action.setBadgeBackgroundColor, {
                color: "#5CA852"
            });
        } else {
            yield call(chrome.action.setBadgeText, { text: "" });
        }
    }
}
