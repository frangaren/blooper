import { createSelector, Selector } from "reselect";
import { selectTapes } from ".";
import { Playing, State, Step, Tape } from "../models";

export function selectPlaying(state: State): Playing {
    return state.playing;
}

export function selectPlayingStatus(state: State): boolean {
    const playing = selectPlaying(state);
    return playing.status;
}

export function selectPlayingTarget(state: State): string | undefined {
    const playing = selectPlaying(state);
    return playing.target;
}

export function selectPlayingTabId(state: State): number | undefined {
    const playing = selectPlaying(state);
    return playing.tabId;
}

export function selectPlayingStepIndex(state: State): number | undefined {
    const playing = selectPlaying(state);
    return playing.step;
}

export const selectPlayingTape: Selector<
    State,
    Tape | undefined
> = createSelector(
    [
        selectPlayingTarget,
        selectTapes,
    ],
    (target, tapes) => !!target ? tapes[target] : undefined,
);

export const selectPlayingTapeLength: Selector<
    State,
    number | undefined
> = createSelector(
    [
        selectPlayingTape,
    ],
    tape => tape?.steps?.length,
);

export const selectPlayingStep: Selector<
    State,
    Step | undefined
> = createSelector(
    [
        selectPlayingTape,
        selectPlayingStepIndex,
    ],
    (tape, stepIndex) => {
        if (stepIndex !== undefined) {
            return tape?.steps?.[stepIndex];
        }
        return undefined;
    }
);

export const selectPlayingTask: Selector<
    State,
    [number, Step] | undefined
> = createSelector(
    [
        selectPlayingTabId,
        selectPlayingStep
    ],
    (tabId, step) => {
        if (tabId !== undefined && step !== undefined) {
            return [tabId, step];
        }
        return undefined;
    }
);
