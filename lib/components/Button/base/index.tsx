import { forwardRef } from "react";
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
} from "@deriv/quill-icons";
import "../button.scss";
import { CaptionText, Text } from "@components/Typography";

export const ButtonSize = {
    xl: "quill-button__size--xl",
    lg: "quill-button__size--lg",
    md: "quill-button__size--md",
    sm: "quill-button__size--sm",
} as const;

const dropdownIcons = {
    sm: LabelPairedChevronDownSmBoldIcon,
    md: LabelPairedChevronDownMdBoldIcon,
    lg: LabelPairedChevronDownLgBoldIcon,
    xl: LabelPairedChevronDownXlBoldIcon,
};
export const loaderIcons = {
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
            selected,
            fullWidth = false,
            isLoading = false,
            size = "md",
            label,
            disabled,
            iconPosition,
            variant = "primary",
            ...rest
        },
        ref,
    ) => {
        const buttonColorClass = `quill__color--${variant}-${color}`;
        const labelSize = size === "md" ? "sm" : size === "lg" ? "md" : "xl";
        const DropdownIcon = dropdownIcons[size];
        const LoaderIcon = loaderIcons[size];

        return (
            <button
                className={clsx(
                    "quill-button",
                    ButtonSize[size],
                    buttonColorClass,
                    className,
                    fullWidth && "quill-button__full-width",
                )}
                disabled={disabled}
                data-state={selected ? "selected" : ""}
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
                {children && <div>{children}</div>}
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
                {dropdown && DropdownIcon && !isLoading && (
                    <DropdownIcon
                        data-state={isDropdownOpen ? "open" : "close"}
                        className={clsx(
                            "quill-button__transform",
                            isDropdownOpen && "quill-button__transform-rotate",
                        )}
                    />
                )}
            </button>
        );
    },
);

Button.displayName = "Button";

export default Button;
