import React, { ComponentProps, ReactElement } from "react";
import { TGenericSizes } from "../../../types";
import { StandaloneChevronDownRegularIcon } from "@deriv/quill-icons/Standalone";
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
    isDropdownOpen: boolean;
    size?: Extract<TGenericSizes, "xl" | "lg" | "md" | "sm">;
    isDropDownMenu?: boolean;
    isFullWidth?: boolean;
    isLoading?: boolean;
    iconPosition?: "start" | "end";
    className?: string;
    label?: string;
    children?: ReactElement;
}

const ButtonSize = {
    xl: "quill-button__size--xl",
    lg: "quill-button__size--lg",
    md: "quill-button__size--md",
    sm: "quill-button__size--sm",
} as const;

const ChipStandaloneIconSizes = {
    xl: "quill-button__standalone-icon--xl",
    lg: "quill-button__standalone-icon--lg",
    md: "quill-button__standalone-icon--md",
    sm: "quill-button__standalone-icon--sm",
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
    isDropDownMenu = false,
    isDropdownOpen = false,
    ...rest
}: ButtonProps) => {
    const buttonColorClass = `quill__color--${variant}-${color}`;

    return (
        <>
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
                {label && !isLoading && (
                    <Typography as="span">{label}</Typography>
                )}
                {isDropDownMenu && (
                    <>
                        <StandaloneChevronDownRegularIcon
                            data-state={isDropdownOpen ? "open" : "close"}
                            fill="var(--semantic-color-typography-prominent)"
                            className={
                                (clsx(
                                    "transition-transform duration-300 data-[state=open]:rotate-180",
                                ),
                                ChipStandaloneIconSizes[size])
                            }
                        />
                    </>
                )}
            </button>
        </>
    );
};
