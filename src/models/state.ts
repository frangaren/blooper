import { createPlaying, Playing } from "./playing";
import { createRecording, Recording } from "./recording";
import { createTabs, Tabs } from "./tabs";
import { createTapes, Tape } from "./tapes";

export interface State {
    playing: Playing;
    recording: Recording;
    tapes: Record<string, Tape>;
    tabs: Tabs;
}

export function createState(): State {
    return {
        playing: createPlaying(),
        recording: createRecording(),
        tapes: createTapes(),
        tabs: createTabs(),
    };
}
