import { createAction } from "@reduxjs/toolkit";

export interface DeleteTapeParams {
    target: string;
};
export const deleteTape = createAction<DeleteTapeParams>("tapes/delete");

export interface RenameTapeParams {
    target: string;
    name: string;
};
export const renameTape = createAction<RenameTapeParams>("tapes/rename");
