import { TMediumSizes } from "@types";
import React, { HTMLAttributes, ReactNode, forwardRef } from "react";
import { Text } from "@components/Typography";
import clsx from "clsx";
import "./title.scss";

export interface DropdownTitleProps extends HTMLAttributes<HTMLElement> {
    as?: keyof HTMLElementTagNameMap;
    size?: TMediumSizes;
    centered?: boolean;
    label: ReactNode;
    icon?: ReactNode;
}

const DropdownTitle = forwardRef<HTMLElement, DropdownTitleProps>(
    ({
        as: Component = "div",
        label,
        size = "md",
        icon,
        className,
        centered,
        ...rest
    }: DropdownTitleProps) => {
        return (
            <Component
                className={clsx(
                    "quill-dropdown-title__container",
                    `quill-dropdown-title__container--${size}`,
                    className,
                )}
                {...rest}
            >
                {centered && <div className="quill-dropdown-title__icon" />}
                <Text
                    size={size}
                    className="quill-dropdown-title__label"
                    color="quill-typography__color--subtle"
                    centered={centered}
                >
                    {label}
                </Text>
                <div className="quill-dropdown-title__icon">{icon}</div>
            </Component>
        );
    },
);

export default DropdownTitle;
