import { FC } from "react";
import { BsFillTrash2Fill } from "react-icons/bs";
import "./DeleteButton.css";
import IconButton from "./IconButton";

export interface DeleteButtonProps {
    disabled?: boolean;
    onDelete?: () => void;
};

const DeleteButton: FC<DeleteButtonProps> = ({
    disabled,
    onDelete,
}) => {
    return (
        <IconButton
            classNames={["delete-button"]}
            disabled={disabled}
            onClick={onDelete}
        >
            <BsFillTrash2Fill />
        </IconButton>
    );
};

export default DeleteButton;
