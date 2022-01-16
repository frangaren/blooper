import { ActionPattern, Effect, select, take } from "@redux-saga/core/effects";
import { Action } from "redux";
import { Selector } from "reselect";

export type Eq<T> = (a: T, b: T) => boolean;

export function refEq<T>(a: T, b: T): boolean {
    return a === b;
}

export function* waitForChange<R>(
    selector: Selector<any, R, any[]>,
    pattern: ActionPattern<Action<any>> = "*",
    eq: Eq<R | undefined> = refEq,
): Generator<Effect, R, R> {
    let old = yield select(selector);
    while (true) {
        yield take(pattern);
        const current: R = yield select(selector);
        if (!eq(old, current)) {
            return current;
        }
    }
}
