import { Dispatch } from "redux";
import { advancePlayingStep } from "../actions";
import { Step } from "../models";
import { isOrphan } from "../utils/is-orphan";
import { execute } from "./step-executor";

export class PlayerClient {


    constructor() {
        this._onMessage = this._onMessage.bind(this);
    }

    start(): void {
        chrome.runtime.onMessage.addListener(this._onMessage);
        chrome.runtime.sendMessage({ type: "player/ready" });
    }

    #dispose(): void {
        chrome.runtime.onMessage.removeListener(this._onMessage);
    }

    _onMessage(
        message: any,
        _sender: chrome.runtime.MessageSender,
        reply: (response?: any) => void,
    ): void {
        if (isOrphan()) {
            this.#dispose();
            return;
        }
        if (message.type === "player/step") {
            execute(message.step);
            reply({
                type: "player/acknowledge",
                stepUUID: message.step.uuid,
            });
            chrome.runtime.sendMessage({
                type: "player/step-done",
                stepUUID: message.step.uuid,
            });
        }
    }

}

export class PlayerServer {

    #dispatch: Dispatch;
    #retry: number;
    #maxRetries: number;

    constructor(dispatch: Dispatch, maxRetries: number = 10) {
        this.#dispatch = dispatch;
        this.#retry = 0;
        this.#maxRetries = maxRetries;

        this._onMessage = this._onMessage.bind(this);

        chrome.runtime.onMessage.addListener(this._onMessage)
    }

    _onMessage(
        message: any,
        sender: chrome.runtime.MessageSender,
        _reply: (response?: any) => void,
    ): void {
        switch (message.type) {
            case "player/step-done":
                setTimeout(() => {
                    this.#dispatch(advancePlayingStep(
                        { tabId: sender.tab?.id, stepUUID: message.stepUUID }
                    ));
                }, 1000);
                break;
        }
    }

    step(tabId: number, step: Step): void {
        const timeout = setTimeout(() => {
            if (this.#retry < this.#maxRetries) {
                this.#retry = this.#retry + 1;
                this.step(tabId, step);
            } else {
                console.error("Player max retries exceeded.");
            }
        }, 1000);
        chrome.tabs.sendMessage(
            tabId,
            {
                type: "player/step",
                step,
            },
            message => {
                if (message !== undefined && message.type === "player/acknowledge") {
                    clearTimeout(timeout);
                    this.#retry = 0;
                }
            },
        );
    }
}
