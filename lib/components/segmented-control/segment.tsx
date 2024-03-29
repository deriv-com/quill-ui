import React, { RefObject, forwardRef, useEffect } from "react";
import clsx from "clsx";
import {
    LabelPairedPlaceholderLgRegularIcon,
    LabelPairedPlaceholderMdRegularIcon,
    LabelPairedPlaceholderSmRegularIcon,
} from "@deriv/quill-icons";
import { Text } from "../Typography";
import { SegmentedControlProps } from "./base";

interface SegmentProps {
    allowFocus?: boolean;
    className?: string;
    icon?: string | React.ReactNode;
    isAnimated?: boolean;
    isDisabled?: boolean;
    isSelected?: boolean;
    label?: string;
    onClick: () => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
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
            allowFocus,
            className,
            icon,
            isAnimated,
            isDisabled,
            isSelected,
            label,
            onClick,
            onKeyDown,
            size,
        },
        ref,
    ) => {
        const [focused, setFocused] = React.useState(false);
        const Icon =
            icon === "placeholder"
                ? placeholder[size as keyof typeof placeholder]
                : icon;

        const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (e.key !== "Tab") setFocused(false);
            onKeyDown(e);
        };

        const handleClick = () => {
            setFocused(false);
            onClick();
        };

        useEffect(() => {
            if (
                isSelected &&
                !allowFocus &&
                (ref as RefObject<HTMLButtonElement>)?.current
            ) {
                (ref as RefObject<HTMLButtonElement>)?.current?.focus();
            }
        }, [isSelected]);

        return (
            <button
                className={clsx(
                    "item",
                    isAnimated && "animated",
                    isDisabled && "disabled",
                    focused && allowFocus && "focused",
                    isSelected && !isAnimated && "selected",
                    className,
                )}
                onClick={isDisabled ? undefined : handleClick}
                onKeyDown={handleKeyDown}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
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
