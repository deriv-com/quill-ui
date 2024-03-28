import React, { RefObject } from "react";
import clsx from "clsx";
import { TRegularSizes } from "../../types";
import { Segment } from "./segment";
import "./segmented-control.scss";

export interface SegmentedControlProps {
    className?: string;
    options: Array<{
        disabled?: boolean;
        icon?: string | React.ReactNode;
        label?: string;
        selected?: boolean;
    }>;
    onChange?: (selectedItemIndex: number) => void;
    hasContainerWidth?: boolean;
    size?: TRegularSizes;
}

export const SegmentedControl = ({
    className,
    options = [],
    onChange,
    hasContainerWidth,
    size = "md",
}: SegmentedControlProps) => {
    const handleKeyboardEvents = (
        e: React.KeyboardEvent<HTMLButtonElement>,
        idx: number,
        ref: RefObject<HTMLButtonElement>,
    ) => {
        if (!options[idx].disabled && (e.key === "Enter" || e.key === " ")) {
            onChange?.(idx);
        }
        if (e.key === "ArrowLeft") {
            (ref?.current?.previousElementSibling as HTMLElement)?.focus();
        }
        if (e.key === "ArrowRight") {
            (ref?.current?.nextElementSibling as HTMLElement)?.focus();
        }
    };

    return (
        <div
            className={clsx(
                "segmented-control",
                `segmented-control--${size}`,
                hasContainerWidth && "segmented-control--has-container-width",
                className,
            )}
        >
            {options.map(({ disabled, icon, label, selected }, idx) => {
                const segmentRef = React.useRef<HTMLButtonElement>(null);
                return (
                    <Segment
                        key={`${idx}_${label}`}
                        icon={icon}
                        isDisabled={disabled}
                        isSelected={selected}
                        label={label}
                        onClick={() => onChange?.(idx)}
                        onKeyDown={(
                            e: React.KeyboardEvent<HTMLButtonElement>,
                        ) => handleKeyboardEvents(e, idx, segmentRef)}
                        size={size}
                        ref={segmentRef}
                    />
                );
            })}
        </div>
    );
};
