import React, { ReactNode, RefObject, forwardRef, useEffect } from "react";
import clsx from "clsx";
import { Text } from "@components/Typography";
import { KEY } from "@utils/common-utils";
import { SegmentedControlProps } from "./base";

export interface SegmentProps {
    allowFocus?: boolean;
    className?: string;
    icon?: ReactNode;
    isAnimated?: boolean;
    isDisabled?: boolean;
    isSelected?: boolean;
    label?: ReactNode;
    onClick: () => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
    size?: SegmentedControlProps["size"];
}

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

        const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
            if (e.key !== KEY.TAB) setFocused(false);
            onKeyDown(e);
        };

        const handleClick = () => {
            if (isSelected) return;
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
                    focused && allowFocus && "focused",
                    isSelected && !isAnimated && "selected",
                    className,
                )}
                disabled={isDisabled}
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                ref={ref}
            >
                {icon && <span className="icon">{icon}</span>}
                {label && (
                    <Text size={size} as="span">
                        {label}
                    </Text>
                )}
            </button>
        );
    },
);
