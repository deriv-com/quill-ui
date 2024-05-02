import React, { ReactNode } from "react";
import { TMediumSizes } from "@types";
import "./dropdown-item.scss";
import clsx from "clsx";
import { Text } from "@components/Typography";

export interface DropdownItemProps {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    as?: "div" | "li";
    size?: TMediumSizes;
    centered?: boolean;
    label: ReactNode;
    disabled?: boolean;
    selected?: boolean;
    className?: string;
}

export const DropdownItem = ({
    as: Component = "div",
    leftIcon,
    rightIcon,
    size = "md",
    centered = false,
    label,
    disabled = false,
    selected = false,
    className,
}: DropdownItemProps) => {
    return (
        <Component
            className={clsx(
                "quill-dropdown-item",
                `quill-dropdown-item__size--${size}`,
                `quill-dropdown-item__selected--${selected}__disabled--${disabled}`,
                className,
            )}
        >
            {leftIcon}
            <Text
                size={size}
                color="disabled"
                className={clsx(
                    "quill-dropdown-item-label",
                    disabled && "quill-typography__color--disabled",
                )}
                centered={centered}
            >
                {label}
            </Text>
            {rightIcon}
        </Component>
    );
};

export default DropdownItem;
