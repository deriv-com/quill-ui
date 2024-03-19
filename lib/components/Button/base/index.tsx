import React, { ComponentProps, ReactElement } from "react";
import { TGenericSizes } from "../../../types";
import clsx from "clsx";
import "../button.scss";
import "../../../styles/quill.css";
import { Typography } from "../../Typography/base";
import { QuillSvgProps } from "@deriv/quill-icons";

export type TVariant = "primary" | "secondary" | "tertiary";

export type TColor = "coral" | "black" | "white" | "purchase" | "sell";

export type QuillIconComponent = React.ForwardRefExoticComponent<
    Omit<QuillSvgProps, "ref">
>;
export interface ButtonProps extends ComponentProps<"button"> {
    variant?: TVariant;
    color?: TColor;
    icon?: QuillIconComponent;
    chevronIcon?: QuillIconComponent;
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

export const Button = ({
    className,
    color = "coral",
    icon: Icon,
    chevronIcon: ChevronIcon,
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
                    "quill-button__size",
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
                {Icon && !isLoading && <Icon iconSize={size} />}

                {label && !isLoading && (
                    <Typography as="span">{label}</Typography>
                )}
                {isDropDownMenu && ChevronIcon && (
                    <ChevronIcon
                        iconSize={size}
                        data-state={isDropdownOpen ? "open" : "close"}
                        className="transition-transform duration-300 data-[state=open]:rotate-180"
                    />
                )}
            </button>
        </>
    );
};
