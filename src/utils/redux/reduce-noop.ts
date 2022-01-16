import { Action, AnyAction } from "redux";

export function ReduceNoop<
    S = any,
    A extends Action<any> = AnyAction
>(state: S, _: A) {
    return state;
}
