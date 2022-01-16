import { State, Tab, Tabs } from "../models";
import { selectActiveTab, selectTabs } from "../selectors";

export function updateTabs(state: State, newValue: Tabs): State {
    state.tabs = newValue;
    return state;
}

export function updateActiveTab(state: State, newValue: Tab): State {
    const tabs = selectTabs(state);
    tabs.active = newValue;
    return state;
}

export function updateActiveURL(state: State, newValue: string): State {
    const tab = selectActiveTab(state);
    if (tab !== undefined) {
        tab.url = newValue;
    }
    return state;
}
