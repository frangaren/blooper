import { all, call } from "@redux-saga/core/effects";
import { Effect } from "@redux-saga/types";
import { PlayerServer } from "../player/player";
import { RecorderServer } from "../recorder";
import { play } from "./player";
import { setPlayingBadge } from "./playing-badge";
import { record } from "./recorder";
import { setRecordingBadge } from "./recording-badge";

export function* rootSaga(
    recorder: RecorderServer,
    player: PlayerServer,
): Generator<Effect, void, void> {
    yield all([
        call(setRecordingBadge),
        call(setPlayingBadge),
        call(record, recorder),
        call(play, player)
    ]);
};
