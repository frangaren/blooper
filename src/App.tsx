import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTape, renameTape, startPlaying, startRecording, stopPlaying, stopRecording } from "./actions";
import "./App.css";
import RecordButton from "./components/buttons/RecordButton";
import { TapeList } from "./components/TapeList";
import { selectIsPrivilegedTab, selectPlayingStatus, selectPlayingTarget, selectRecordingStatus, selectTapes } from "./selectors";

function App() {
    const dispatch = useDispatch();
    const playing = useSelector(selectPlayingStatus);
    const playingTarget = useSelector(selectPlayingTarget);
    const recording = useSelector(selectRecordingStatus);
    const tapes = useSelector(selectTapes);
    const disabled = useSelector(selectIsPrivilegedTab);
    const onStartRecording = useCallback(
        () => dispatch(startRecording()),
        [dispatch],
    );
    const onStopRecording = useCallback(
        () => dispatch(stopRecording()),
        [dispatch],
    );
    const onStartPlaying = useCallback(
        (uuid: string) => dispatch(startPlaying({
            target: uuid,
        })),
        [dispatch],
    );
    const onStopPlaying = useCallback(
        (uuid: string) => {
            dispatch(stopPlaying())
        },
        [dispatch],
    );
    const onDeleteTape = useCallback(
        (uuid: string) => dispatch(deleteTape({
            target: uuid,
        })),
        [dispatch],
    );
    const onRenameTape = useCallback(
        (uuid: string, name: string) => dispatch(renameTape({
            target: uuid,
            name,
        })),
        [dispatch],
    );
    return (
        <>
            <header>
                <h2>My Bloops</h2>
                <div className="controls">
                    <RecordButton
                        disabled={playing || disabled}
                        recording={recording}
                        onStart={onStartRecording}
                        onStop={onStopRecording}
                    />
                </div>
            </header>
            <TapeList
                tapes={Object.values(tapes)}
                playing={playing}
                playingTarget={playingTarget}
                playDisabled={recording || disabled}
                onPlay={onStartPlaying}
                onStop={onStopPlaying}
                onDelete={onDeleteTape}
                onRename={onRenameTape}
            />
        </>
    );
}

export default App;
