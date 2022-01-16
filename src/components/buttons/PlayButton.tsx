import { FC, useCallback } from "react";
import { BsFillStopFill, BsPlayFill } from "react-icons/bs";
import IconButton from "./IconButton";
import "./PlayButton.css";

export interface PlayButtonProps {
    disabled?: boolean;
    onPlay?: () => void;
    onStop?: () => void;
    playing?: boolean;
};

const PlayButton: FC<PlayButtonProps> = ({
    disabled,
    onPlay,
    onStop,
    playing,
}) => {
    let classNames: string[] = [
        "play-button",
    ];
    if (playing) {
        classNames = [
            ...classNames,
            "play-button_playing",
        ];
    }
    const togglePlaying = useCallback(
        () => {
            if (playing) {
                onStop && onStop();
            } else {
                onPlay && onPlay();
            }
        },
        [onPlay, onStop, playing],
    )
    return (
        <IconButton
            classNames={classNames}
            disabled={disabled && !playing}
            onClick={togglePlaying}
        >
            {
                playing
                    ? (<BsFillStopFill />)
                    : (<BsPlayFill />)
            }
        </IconButton>
    );
};

export default PlayButton;
