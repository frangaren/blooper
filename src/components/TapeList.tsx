import { FC, useCallback } from "react";
import { Tape as TapeModel } from "../models";
import { downloadSelenium } from "../utils/to-selenium";
import DeleteButton from "./buttons/DeleteButton";
import ExportButton from "./buttons/ExportButton";
import PlayButton from "./buttons/PlayButton";
import EditableLabel from "./EditableLabel";
import "./TapeList.css";

export interface TapeListProps {
    tapes: TapeModel[];
    playing?: boolean;
    playingTarget?: string;
    playDisabled?: boolean;
    deleteDisabled?: boolean;
    onPlay?: (uuid: string) => void;
    onStop?: (uuid: string) => void;
    onDelete?: (uuid: string) => void;
    onRename?: (uuid: string, name: string) => void;
};

export const TapeList: FC<TapeListProps> = ({
    tapes,
    playing,
    playingTarget,
    playDisabled,
    deleteDisabled,
    onPlay,
    onStop,
    onDelete,
    onRename,
}) => {
    if (tapes.length > 0) {
        return (
            <ul className="tape-list">
                {
                    tapes.map(tape => {
                        const playingThis = playingTarget === tape.uuid;
                        const notPlayingThis = playing && !playingThis;
                        return (
                            <Tape
                                key={tape.uuid}
                                tape={tape}
                                playing={playingThis}
                                playDisabled={playDisabled || notPlayingThis}
                                deleteDisabled={deleteDisabled || playingThis}
                                onPlay={onPlay}
                                onStop={onStop}
                                onDelete={onDelete}
                                onRename={onRename}
                            />
                        )
                    })
                }
            </ul>
        );
    } else {
        return (
            <div className="tape-list_empty">
                Nothing here! Create a bloop clicking on the record button.
            </div>
        );
    }
};

export interface TapeProps {
    tape: TapeModel;
    playing?: boolean;
    playDisabled?: boolean;
    deleteDisabled?: boolean;
    onPlay?: (uuid: string) => void;
    onStop?: (uuid: string) => void;
    onDelete?: (uuid: string) => void;
    onRename?: (uuid: string, name: string) => void;
};

export const Tape: FC<TapeProps> = ({
    tape,
    playing,
    playDisabled,
    deleteDisabled,
    onPlay: onPlayGeneric,
    onStop: onStopGeneric,
    onDelete: onDeleteGeneric,
    onRename: onRenameGeneric,
}) => {
    const onPlay = useCallback(
        () => onPlayGeneric && onPlayGeneric(tape.uuid),
        [onPlayGeneric, tape.uuid],
    );
    const onStop = useCallback(
        () => onStopGeneric && onStopGeneric(tape.uuid),
        [onStopGeneric, tape.uuid],
    );
    const onDelete = useCallback(
        () => onDeleteGeneric && onDeleteGeneric(tape.uuid),
        [onDeleteGeneric, tape.uuid],
    );
    const onRename = useCallback(
        (name: string) => onRenameGeneric && onRenameGeneric(tape.uuid, name),
        [onRenameGeneric, tape.uuid],
    );
    const onExport = useCallback(
        () => downloadSelenium(tape),
        [tape],
    );
    return (
        <li className="tape-list_tape">
            <EditableLabel
                value={tape.name}
                onChange={onRename}
            />
            <div className="tape-list_controls">
                <PlayButton
                    disabled={playDisabled}
                    playing={playing}
                    onPlay={onPlay}
                    onStop={onStop}
                />
                <ExportButton
                    onExport={onExport}
                />
                <DeleteButton
                    disabled={deleteDisabled}
                    onDelete={onDelete}
                />
            </div>
        </li>
    )
};
