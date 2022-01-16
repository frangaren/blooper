import { FC } from "react";
import { BiExport } from "react-icons/bi";
import "./ExportButton.css";
import IconButton from "./IconButton";

export interface ExportButtonProps {
    disabled?: boolean;
    onExport?: () => void;
};

const ExportButton: FC<ExportButtonProps> = ({
    disabled,
    onExport,
}) => {
    return (
        <IconButton
            classNames={["export-button"]}
            disabled={disabled}
            onClick={onExport}
        >
            <BiExport />
        </IconButton>
    );
};

export default ExportButton;
