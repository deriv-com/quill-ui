import React, { forwardRef } from "react";
import clsx from "clsx";
import { ButtonProps } from "../types";
import {
    LabelPairedChevronDownLgBoldIcon,
    LabelPairedChevronDownMdBoldIcon,
    LabelPairedChevronDownSmBoldIcon,
    LabelPairedChevronDownXlBoldIcon,
    LabelPairedLoaderCaptionRegularIcon,
    LabelPairedLoaderLgRegularIcon,
    LabelPairedLoaderMdRegularIcon,
    LabelPairedLoaderSmRegularIcon,
    IconTypes,
} from "@deriv/quill-icons";
import "../button.scss";
import { CaptionText, Text } from "@components/Typography";
import { TRegularSizesWithExtraLarge } from "@types";

export const ButtonSize: Record<TRegularSizesWithExtraLarge, string> = {
    xl: "quill-button__size--xl",
    lg: "quill-button__size--lg",
    md: "quill-button__size--md",
    sm: "quill-button__size--sm",
} as const;

const dropdownIcons: Record<TRegularSizesWithExtraLarge, IconTypes> = {
    sm: LabelPairedChevronDownSmBoldIcon,
    md: LabelPairedChevronDownMdBoldIcon,
    lg: LabelPairedChevronDownLgBoldIcon,
    xl: LabelPairedChevronDownXlBoldIcon,
};
export const loaderIcons: Record<TRegularSizesWithExtraLarge, IconTypes> = {
    sm: LabelPairedLoaderCaptionRegularIcon,
    md: LabelPairedLoaderSmRegularIcon,
    lg: LabelPairedLoaderMdRegularIcon,
    xl: LabelPairedLoaderLgRegularIcon,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            color = "coral",
            icon,
            children,
            isDropdownOpen,
            dropdown = false,
            showChevron = true,
            selected,
            fullWidth = false,
            isLoading = false,
            size = "md",
            label,
            disabled,
            iconPosition = "start",
            isOpaque,
            variant = "primary",
            iconButton = false,
            ...rest
        },
        ref,
    ) => {
        const buttonColorClass = `quill__color--${variant}-${color}`;
        const iconButtonClass = `quill-icon-button__size--${size}`;
        const labelSize = size === "md" ? "sm" : size === "lg" ? "md" : "xl";
        const DropdownIcon = dropdownIcons[size];
        const LoaderIcon = loaderIcons[size];
        const Wrapper = isOpaque ? "span" : React.Fragment;

        return (
            <Wrapper
                {...(isOpaque
                    ? {
                          className: clsx(
                              "quill-button",
                              "quill-button__white-bg-wrapper",
                              iconButton ? iconButtonClass : ButtonSize[size],
                              fullWidth && "quill-button__full-width",
                          ),
                      }
                    : {})}
            >
                <button
                    className={clsx(
                        "quill-button",
                        iconButton ? iconButtonClass : ButtonSize[size],
                        buttonColorClass,
                        className,
                        fullWidth && "quill-button__full-width",
                    )}
                    disabled={disabled}
                    data-state={selected ? "selected" : ""}
                    data-loading={isLoading}
                    ref={ref}
                    {...rest}
                >
                    {iconPosition === "start" && icon && !isLoading && icon}

                    {isLoading && !disabled && (
                        <LoaderIcon
                            data-testid="button-loader"
                            className="quill-button__loader-icon"
                        />
                    )}
                    {children}
                    {label && !isLoading && (
                        <span className="quill-button-label">
                            {size === "sm" ? (
                                <CaptionText color={color} bold>
                                    {label}
                                </CaptionText>
                            ) : (
                                <Text size={labelSize} bold color={color}>
                                    {label}
                                </Text>
                            )}
                        </span>
                    )}
                    {iconPosition === "end" && icon && !isLoading && icon}
                    {dropdown && showChevron && DropdownIcon && !isLoading && (
                        <DropdownIcon
                            data-state={isDropdownOpen ? "open" : "close"}
                            className={clsx(
                                "quill-button__transform",
                                isDropdownOpen &&
                                    "quill-button__transform-rotate",
                            )}
                        />
                    )}
                </button>
            </Wrapper>
        );
    },
);

Button.displayName = "Button";

export default Button;
