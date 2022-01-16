import { ClickStep, InputStep, Step } from "../models";

type Executor<S> = (step: S) => void;

function executeInput(step: InputStep): void {
    const target = document.querySelector(step.target);
    if (target === null) {
        console.warn(`Selector "${step.target}" not found.`);
    } else {
        const element = target as HTMLInputElement;
        let cancelled = !element.dispatchEvent(new InputEvent(
            "beforeInput",
            {
                bubbles: true,
                cancelable: true,
            }
        ));
        if (cancelled) {
            return;
        }
        element.value = step.value
        cancelled = !element.dispatchEvent(new InputEvent(
            "input",
            {
                bubbles: true,
                cancelable: true,
            }
        ));
        if (cancelled) {
            return;
        }
    }
}

function executeClick(step: ClickStep): void {
    const target = document.querySelector(step.target);
    if (target === null) {
        console.warn(`Selector "${step.target}" not found.`);
    } else {
        const element = target;
        if ("click" in element) {
            (element as HTMLElement).click();
        } else {
            const eventNames = ["mousedown", "mouseup", "click"];
            for (const eventName of eventNames) {
                const cancelled = !element.dispatchEvent(new MouseEvent(
                    eventName,
                    {
                        bubbles: true,
                        cancelable: true,
                    }
                ));
                if (cancelled) {
                    break;
                }
            }
        }
    }
}

const executors: Record<string, Executor<any>> = {
    click: executeClick,
    input: executeInput,
};

export function execute(step: Step): void {
    if (Object.prototype.hasOwnProperty.call(executors, step.type)) {
        return executors[step.type](step);
    }
}
