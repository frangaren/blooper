import { CaseReducer, createReducer } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { deleteTape as deleteTapeAction, renameTape as renameTapeAction } from "../actions";
import { createState, State } from "../models";
import { selectPlayingTarget, selectTape } from "../selectors";
import { deleteTape, renameTape } from "../updaters";

const reduceDeleteTape: CaseReducer<State> = (
    state: State,
    action: AnyAction,
) => {
    const playingTarget = selectPlayingTarget(state);
    const tape = selectTape(action.payload.target)(state);
    if (action.payload.target !== playingTarget && !!tape) {
        state = deleteTape(state, action.payload.target);
    }
    return state;
};

const reduceRenameTape: CaseReducer<State> = (
    state: State,
    action: AnyAction,
) => {
    state = renameTape(state, action.payload.target, action.payload.name);
    return state;
};

export const reduceTapes = createReducer(createState(), builder => {
    builder
        .addCase(deleteTapeAction, reduceDeleteTape)
        .addCase(renameTapeAction, reduceRenameTape);
});
