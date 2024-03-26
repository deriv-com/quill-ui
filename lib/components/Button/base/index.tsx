import { forwardRef } from 'react';
import clsx from "clsx";
import { ButtonProps } from "../types";
import { Text, CaptionText } from "../../Typography";
import {
    LabelPairedChevronDownLgRegularIcon,
    LabelPairedChevronDownMdRegularIcon,
    LabelPairedChevronDownSmRegularIcon,
    LabelPairedChevronDownXlRegularIcon
} from "@deriv/quill-icons";
import "../button.scss";

export const ButtonSize = {
    xl: "quill-button__size--xl",
    lg: "quill-button__size--lg",
    md: "quill-button__size--md",
    sm: "quill-button__size--sm",
} as const;

const dropdownIcons = {
    sm: LabelPairedChevronDownSmRegularIcon,
    md: LabelPairedChevronDownMdRegularIcon,
    lg: LabelPairedChevronDownLgRegularIcon,
    xl: LabelPairedChevronDownXlRegularIcon
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        className,
        colorStyle = "coral",
        icon: Icon,
        children,
        isDropdownOpen,
        dropdown = false,
        selected,
        fullWidth = false,
        isLoading = false,
        size = "md",
        label,
        iconPosition,
        variant = "primary",
        ...rest
    }, ref) => {
        const buttonColorClass = `quill__color--${variant}-${colorStyle}`;
        const labelSize = size === "md" ? "sm" : size === "lg" ? "md" : "xl";
        const DropdownIcon = dropdownIcons[size];

        return (
            <button
                className={clsx(
                    "quill-button",
                    ButtonSize[size],
                    buttonColorClass,
                    className,
                    fullWidth && "quill-button__full-width"
                )}
                disabled={rest.disabled}
                data-state={selected ? 'selected' : ''}
                ref={ref}
                {...rest}
            >
                {iconPosition === "start" && Icon && !isLoading && <Icon iconSize={size} />}
                {/* To be Added isLoading based on requirement*/}
                {children && <div>{children}</div>}
                {label && (
                    <span className="button-label">
                        {size === "sm" ?
                            <CaptionText color={colorStyle} bold>{label}</CaptionText> :
                            <Text size={labelSize} bold color={colorStyle}>{label}</Text>
                        }
                    </span>
                )}
                {iconPosition === "end" && Icon && !isLoading && <Icon iconSize={size} />}
                {dropdown && DropdownIcon && (
                    <DropdownIcon
                        data-state={isDropdownOpen ? "open" : "close"}
                        className={clsx(isDropdownOpen && "quill-button__transform")}
                    />
                )}
            </button>
        )
    }
);

Button.displayName = 'Button'

export default Button
