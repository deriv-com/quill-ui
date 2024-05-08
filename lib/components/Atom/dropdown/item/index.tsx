import React, { HTMLAttributes, ReactNode } from "react";
import { TMediumSizes } from "@types";
import "./item.scss";
import clsx from "clsx";
import { Text } from "@components/Typography";
import {
    StandaloneSquareCheckFillIcon,
    StandaloneSquareRegularIcon,
} from "@deriv/quill-icons";

export interface DropdownItemProps extends HTMLAttributes<HTMLElement> {
    as?: keyof HTMLElementTagNameMap;
    bold?: boolean;
    italic?: boolean;
    size?: TMediumSizes;
    centered?: boolean;
    label: ReactNode;
    disabled?: boolean;
    selected?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    checkbox?: boolean;
}

export const DropdownItem = React.forwardRef<HTMLElement, DropdownItemProps>(
    (
        {
            as = "li",
            leftIcon,
            rightIcon,
            size = "md",
            centered,
            label,
            disabled = false,
            selected = false,
            className,
            checkbox = false,
            ...rest
        }: DropdownItemProps,
        ref,
    ) => {
        return React.createElement(
            as,
            {
                ref,
                className: clsx(
                    "quill-dropdown-item",
                    `quill-dropdown-item__size--${size}`,
                    checkbox
                        ? `quill-dropdown-item-checkbox__selected--${selected}__disabled--${disabled}`
                        : `quill-dropdown-item__selected--${selected}__disabled--${disabled}`,
                    className,
                ),
                ...rest,
            },
            checkbox ? (
                selected ? (
                    <StandaloneSquareCheckFillIcon iconSize="sm" />
                ) : (
                    <StandaloneSquareRegularIcon iconSize="sm" />
                )
            ) : (
                leftIcon
            ),
            <Text
                size={size}
                className={clsx(
                    "quill-dropdown-item-label",
                    disabled && "quill-typography__color--disabled",
                )}
                centered={centered}
            >
                {label}
            </Text>,
            rightIcon,
        );
    },
);

export default DropdownItem;
