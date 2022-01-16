import { FC, useCallback } from "react";
import { BsFillRecordFill, BsFillStopFill } from "react-icons/bs";
import IconButton from "./IconButton";
import "./RecordButton.css";

export interface RecordButtonProps {
    disabled?: boolean;
    onStart?: () => void;
    onStop?: () => void;
    recording?: boolean;
};

const RecordButton: FC<RecordButtonProps> = ({
    disabled,
    onStart,
    onStop,
    recording,
}) => {
    let classNames: string[] = [
        "record-button",
    ];
    if (recording) {
        classNames = [
            ...classNames,
            "record-button_recording",
        ];
    }
    const toggleRecording = useCallback(
        () => {
            if (recording) {
                onStop && onStop();
            } else {
                onStart && onStart();
            }
        },
        [onStart, onStop, recording],
    );
    return (
        <IconButton
            classNames={classNames}
            disabled={disabled && !recording}
            onClick={toggleRecording}
        >
            {
                recording
                    ? (<BsFillStopFill />)
                    : (<BsFillRecordFill />)
            }
        </IconButton>
    );
};

export default RecordButton;
