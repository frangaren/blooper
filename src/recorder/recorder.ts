import { Dispatch } from "redux";
import { recordStep } from "../actions";
import { parseEvent, supportedEvents } from "./event-parsers";

export class RecorderClient {

    constructor() {
        this._onEvent = this._onEvent.bind(this);
    }

    start(): void {
        for (const event of supportedEvents) {
            document.addEventListener(event, this._onEvent, true);
        }
    }

    _onEvent(event: Event): void {
        const step = parseEvent(event);
        chrome.runtime.sendMessage({
            type: "recorder/step",
            step,
        });
    }

}

export class RecorderServer {

    #dispatch: Dispatch;
    #tabId: number | undefined;

    constructor(dispatch: Dispatch) {
        this.#dispatch = dispatch;
        this.#tabId = undefined;

        this._onMessage = this._onMessage.bind(this);

        chrome.runtime.onMessage.addListener(this._onMessage)
    }

    _onMessage(
        message: any,
        sender: chrome.runtime.MessageSender,
        _reply: (response?: any) => void,
    ): void {
        if (message.type === "recorder/step") {
            if (sender.tab?.id !== undefined && sender.tab?.id === this.#tabId) {
                this.#dispatch(recordStep({ step: message.step }));
            }
        }
    }

    start(tabId: number): void {
        this.#tabId = tabId;
    }

    stop(): void {
        this.#tabId = undefined;
    }
}
