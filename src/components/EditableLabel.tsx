import { ChangeEvent, FC, KeyboardEvent, useCallback, useRef, useState } from "react";
import { useOnClickOutside } from "../hooks";
import "./EditableLabel.css";

export interface EditableLabelProps {
    value?: string;
    classNames?: string[];
    disabled?: boolean;
    onChange?: (value: string) => void;
};

const EditableLabel: FC<EditableLabelProps> = ({
    value,
    classNames,
    disabled,
    onChange,
}) => {
    const [editing, setEditing] = useState(false);
    const [editingValue, setEditingValue] = useState("");
    const ref = useRef<HTMLInputElement>(null);
    const enableEditing = useCallback(
        () => {
            if (!editing && !disabled) {
                setEditing(true);
                setEditingValue(value || "");
            }
        },
        [value, editing, disabled, setEditing],
    );
    const disableEditing = useCallback(
        () => {
            if (editing) {
                setEditing(false);
                onChange && onChange(editingValue);
            }
        },
        [editing, setEditing, editingValue, onChange],
    );
    const rollbackEditing = useCallback(
        () => {
            if (editing) {
                setEditing(false);
            }
        },
        [editing, setEditing],
    );
    const onChangeEditingValue = useCallback(
        (event: ChangeEvent) => {
            const element = event.target as HTMLInputElement;
            setEditingValue(element.value);
        },
        [setEditingValue]
    );
    const onKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if (event.code === "Enter") {
                disableEditing();
            } else if (event.code === "Escape") {
                rollbackEditing();
            }
        },
        [disableEditing, rollbackEditing]
    );
    useOnClickOutside(ref, disableEditing);
    classNames = [
        "editable-label",
        ...(classNames ?? []),
    ];
    if (disabled) {
        classNames = [
            ...classNames,
            "editable-label_disabled",
        ];
    }
    if (editing && !disabled) {
        classNames = [
            ...classNames,
            "editable-label_editing",
        ];
        return (
            <input
                className={classNames.join(" ")}
                ref={ref}
                type="text"
                onChange={onChangeEditingValue}
                onKeyPress={onKeyPress}
                value={editingValue}
                autoFocus
            />
        );
    } else {
        return (
            <p
                className={classNames.join(" ")}
                onClick={enableEditing}
            >
                {value}
            </p>
        )
    }
};

export default EditableLabel;
