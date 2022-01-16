import { call } from "@redux-saga/core/effects";
import { Effect } from "@redux-saga/types";
import { Step } from "../models";
import { PlayerServer } from "../player/player";
import { selectPlayingTask } from "../selectors";
import { waitForChange } from "./util";

export function* play(
    player: PlayerServer
): Generator<Effect, void, [number, Step] | undefined> {
    while (true) {
        const task = yield* waitForChange<[number, Step] | undefined>(
            selectPlayingTask
        );
        if (task !== undefined) {
            const [tabId, step] = task;
            yield call(player.step.bind(player), tabId, step);
        }
    }
}
