import { createAction } from "@reduxjs/toolkit";

export interface SetActiveTabParams {
    id?: number;
    url?: string;
};
export const setActiveTab = createAction<SetActiveTabParams>('tabs/set-active');

export interface SetTabURLParams {
    id?: number;
    url?: string;
};
export const setTabURL = createAction<SetTabURLParams>('tabs/set-url');
