import React, { HTMLAttributes, ReactNode } from "react";
import { TLeftOrCenter, TRegularSizes } from "@types";
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
    size?: TRegularSizes;
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
        const itemSize = size === "lg" ? "md" : size;

        return React.createElement(
            as,
            {
                ref,
                className: clsx(
                    "quill-dropdown-item",
                    `quill-dropdown-item__size--${itemSize}`,
                    `quill-dropdown-item__align-${textAlignment}`,
                    checkbox
                        ? `quill-dropdown-item-checkbox__selected--${selected}__disabled--${disabled}`
                        : `quill-dropdown-item__selected--${selected}__disabled--${disabled}`,
                    className,
                ),
                ...rest,
            },
            (checkbox || centered || leftIcon) && (
                <div className="quill-dropdown-item__icon">
                    {checkbox ? (
                        selected ? (
                            <StandaloneSquareCheckFillIcon iconSize="sm" />
                        ) : (
                            <StandaloneSquareRegularIcon iconSize="sm" />
                        )
                    ) : (
                        leftIcon
                    )}
                </div>
            ),
            <Text
                size={itemSize}
                className={clsx(
                    "quill-dropdown-item-label",
                    disabled && "quill-typography__color--disabled",
                )}
                color={labelColor}
                centered={centered}
            >
                {label}
            </Text>,
            (centered || rightIcon) && (
                <div className="quill-dropdown-item__icon">{rightIcon}</div>
            ),
        );
    },
);

export default DropdownItem;
