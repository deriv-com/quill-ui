import React, { HTMLAttributes, ReactNode } from "react";
import { TLeftOrCenter, TMediumSizes } from "@types";
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
    textAlignment?: TLeftOrCenter;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    checkbox?: boolean;
    labelColor?: string;
}

export const DropdownItem = React.forwardRef<HTMLElement, DropdownItemProps>(
    (
        {
            as = "li",
            leftIcon,
            rightIcon,
            size = "md",
            centered,
            textAlignment = "left",
            label,
            disabled = false,
            selected = false,
            className,
            checkbox = false,
            labelColor,
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
                    `quill-dropdown-item__align-${textAlignment}`,
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
                color={labelColor}
                centered={centered}
            >
                {label}
            </Text>,
            rightIcon,
        );
    },
);

export default DropdownItem;
