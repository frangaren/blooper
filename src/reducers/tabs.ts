import { CaseReducer, createReducer } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { setActiveTab, setTabURL } from "../actions";
import { createState, State } from "../models";
import { selectActiveTabId } from "../selectors";
import { updateActiveTab, updateActiveURL } from "../updaters";

const reduceSetActiveTab: CaseReducer<State> = (
    state: State,
    action: AnyAction,
) => {
    state = updateActiveTab(state, action.payload);
    return state;
};

const reduceSetTabURL: CaseReducer<State> = (
    state: State,
    action: AnyAction,
) => {
    const activeId = selectActiveTabId(state);
    if (action.payload.id === activeId) {
        state = updateActiveURL(state, action.payload.url);
    }
    return state;
};

export const reduceTabs = createReducer(createState(), builder => {
    builder
        .addCase(setActiveTab, reduceSetActiveTab)
        .addCase(setTabURL, reduceSetTabURL);
});
