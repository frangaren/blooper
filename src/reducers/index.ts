import { AnyAction, Reducer } from "redux";
import { createState, State } from "../models";
import { reducePlaying } from "./playing";
import { reduceRecording } from "./recording";
import { reduceTabs } from "./tabs";
import { reduceTapes } from "./tapes";


export const rootReducer: Reducer<State> = (
    state: State = createState(),
    action: AnyAction
) => {
    console.log(action.type);
    state = reducePlaying(state, action);
    state = reduceRecording(state, action);
    state = reduceTapes(state, action);
    state = reduceTabs(state, action);
    return state;
}
