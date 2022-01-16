import { FC, ReactNode } from "react";
import "./IconButton.css";

export type OnClickCallback = () => void;

export interface IconButtonProps {
    children: ReactNode;
    classNames?: string[];
    disabled?: boolean;
    onClick?: OnClickCallback;
};

const IconButton: FC<IconButtonProps> = ({
    children,
    classNames,
    disabled,
    onClick,
}) => {
    classNames = [
        "icon-button",
        ...(classNames ?? []),
    ];
    if (disabled) {
        classNames = [
            ...classNames,
            "icon-button_disabled",
        ];
    }
    return (
        <div
            className={classNames.join(" ")}
            onClick={disabled ? undefined : onClick}
        >
            {children}
        </div>
    );
};

export default IconButton;
