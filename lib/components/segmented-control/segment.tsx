import React, { forwardRef } from "react";
import clsx from "clsx";
import {
    LabelPairedPlaceholderLgRegularIcon,
    LabelPairedPlaceholderMdRegularIcon,
    LabelPairedPlaceholderSmRegularIcon,
} from "@deriv/quill-icons";
import { Text } from "../Typography";
import { SegmentedControlProps } from "./base";

interface SegmentProps {
    className?: string;
    icon?: string | React.ReactNode;
    isDisabled?: boolean;
    isSelected?: boolean;
    label?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
    size?: SegmentedControlProps["size"];
}

const placeholder = {
    sm: <LabelPairedPlaceholderSmRegularIcon />,
    md: <LabelPairedPlaceholderMdRegularIcon />,
    lg: <LabelPairedPlaceholderLgRegularIcon />,
};

export const Segment = forwardRef<HTMLButtonElement, SegmentProps>(
    (
        {
            className,
            icon,
            isDisabled,
            isSelected,
            label,
            onClick,
            onKeyDown,
            size,
        },
        ref,
    ) => {
        const Icon =
            icon === "placeholder"
                ? placeholder[size as keyof typeof placeholder]
                : icon;
        return (
            <button
                className={clsx(
                    "item",
                    isDisabled && "disabled",
                    isSelected && "selected",
                    className,
                )}
                onClick={isDisabled ? undefined : onClick}
                onKeyDown={onKeyDown}
                ref={ref}
            >
                {icon && <span className="icon">{Icon}</span>}
                {label && (
                    <Text size={size} as="span">
                        {label}
                    </Text>
                )}
            </button>
        );
    },
);
