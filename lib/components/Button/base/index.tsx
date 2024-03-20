import React from "react";
import clsx from "clsx";
import "../button.scss";
import "../../../styles/quill.css";
import { Typography } from "../../Typography/base";
import {StandaloneChevronDownRegularIcon } from "@deriv/quill-icons";
import { ButtonProps } from "../types";

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
    isDropdownOpen,
    dropdown = false,
    isFullWidth = false,
    isLoading = false,
    size = "md",
    label,
    iconPosition,
    variant = "primary",
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
                {iconPosition == "start" && Icon && !isLoading && <Icon iconSize={size} />}
                { /* To be Added isLoading based on requirement*/}
                {label && !isLoading && (
                    <Typography as="span" color={`${color}`}>{label}</Typography>
                )}
                {iconPosition == "end" && Icon && !isLoading && <Icon iconSize={size}/>}
                {  dropdown && (
                    <StandaloneChevronDownRegularIcon
                        iconSize={size}
                        data-state={isDropdownOpen ? "open" : "close"}
                        
                    />
                )}
            </button>
        </>
    );
};
