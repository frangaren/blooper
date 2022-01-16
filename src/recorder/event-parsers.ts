import { v4 as uuid } from "uuid";
import { ClickStep, InputStep, Step } from "../models";
import { getCSSSelector } from "../utils/css-selectors";

type Parser<E, S> = (event: E) => S;

function parseClick(event: MouseEvent): ClickStep {
    return {
        uuid: uuid(),
        type: "click",
        target: getCSSSelector(event.target as HTMLElement),
    };
}

function parseInput(event: InputEvent): InputStep {
    const target = getCSSSelector(event.target as Element);
    const value = (event.target as HTMLInputElement).value;
    return {
        uuid: uuid(),
        type: "input",
        target,
        value,
    };
}

const parsers: Record<string, Parser<any, Step>> = {
    mouseup: parseClick,
    input: parseInput,
};

export function parseEvent(event: Event): Step | undefined {
    if (Object.prototype.hasOwnProperty.call(parsers, event.type)) {
        return parsers[event.type](event);
    }
}

export const supportedEvents = Object.getOwnPropertyNames(parsers);
