import React, { ComponentProps, ReactElement } from "react";
import { TGenericSizes } from "../../../types";
import { Text } from "../../Typography/text";
import clsx from "clsx";
import "../button.scss";
import "../../../styles/quill.css";
import { Typography } from "../../Typography/base";

export type TVariant = "primary" | "secondary" | "tertiary";

export type TColor = "coral" | "black" | "white" | "purchase" | "sell";

export interface ButtonProps extends ComponentProps<"button"> {
    variant?: TVariant;
    color?: TColor;
    icon?: ReactElement;
    size?: Extract<TGenericSizes, "xl" | "lg" | "md" | "sm">;
    textSize?: ComponentProps<typeof Text>["size"];
    isDropDownMenu?: boolean;
    isFullWidth?: boolean;
    isLoading?: boolean;
    rounded?: Extract<TGenericSizes, "lg" | "md" | "sm">;
    iconPosition?: "start" | "end";
    className?: string;
    label?: string;
}

const ButtonSize = {
    xl: "quill-button__size--xl",
    lg: "quill-button__size--lg",
    md: "quill-button__size--md",
    sm: "quill-button__size--sm",
} as const;

export const Button = ({
    className,
    color = "coral",
    icon,
    isFullWidth = false,
    isLoading = false,
    size = "lg",
    label,
    variant = "primary",
    ...rest
}: ButtonProps) => {
    const buttonColorClass = `quill__color--${variant}-${color}`;
    // const isContained = variant === "primary";
    return (
        <button
            className={clsx(
                "quill-button",
                ButtonSize[size],
                buttonColorClass,

                {
                    "quill-button__full-width": isFullWidth,
                },
                className,
            )}
            disabled={rest.disabled || isLoading}
            {...rest}
        >
            {icon && !isLoading && icon}
            {label && !isLoading && <Typography as="span">{label}</Typography>}
        </button>
    );
};
