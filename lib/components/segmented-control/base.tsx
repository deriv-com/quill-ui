import React from "react";
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
}: SegmentedControlProps) => (
    <div
        className={clsx(
            "segmented-control",
            `segmented-control--${size}`,
            hasContainerWidth && "segmented-control--has-container-width",
            className,
        )}
    >
        {options.map(({ disabled, icon, label, selected }, idx) => (
            <Segment
                key={`${idx}_${label}`}
                icon={icon}
                isDisabled={disabled}
                isSelected={selected}
                label={label}
                onClick={() => onChange?.(idx)}
                size={size}
            />
        ))}
    </div>
);
