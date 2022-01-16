import { createSelector, Selector } from "reselect";
import { State, Tab, Tabs } from "../models";

export function selectTabs(state: State): Tabs {
    return state.tabs;
}

export function selectActiveTab(state: State): Tab | undefined {
    const tabs = selectTabs(state);
    return tabs.active;
}

export function selectActiveTabId(state: State): number | undefined {
    const tab = selectActiveTab(state);
    return tab?.id;
}

export function selectActiveURL(state: State): string | undefined {
    const tab = selectActiveTab(state);
    return tab?.url;
}

export const selectIsPrivilegedTab: Selector<State, boolean> = createSelector(
    [
        selectActiveURL,
    ],
    url => {
        if (url !== undefined) {
            return !(/^https?:\/\/.*$/gs.test(url));
        } else {
            return true;
        }
    }
);
