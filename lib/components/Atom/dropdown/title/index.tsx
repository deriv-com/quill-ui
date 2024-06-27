import { TLeftOrCenter, TMediumSizes } from "@types";
import React, { HTMLAttributes, ReactNode } from "react";
import { Text } from "@components/Typography";
import clsx from "clsx";

export interface DropdownTitleProps extends HTMLAttributes<HTMLElement> {
    as?: keyof HTMLElementTagNameMap;
    size?: TMediumSizes;
    centered?: boolean;
    label: ReactNode;
    disabled?: boolean;
    selected?: boolean;
    textAlignment?: TLeftOrCenter;
    icon?: ReactNode;
}

const DropdownTitle = ({
    children,
    label,
    size,
    icon,
    className,
    ...rest
}: DropdownTitleProps) => {
    return (
        <div
            className={clsx(
                `quill-dropdown-title__container--${size}`,
                className,
            )}
            {...rest}
        >
            <Text size={size}>{label}</Text>
            {icon}
        </div>
    );
};

export default DropdownTitle;
