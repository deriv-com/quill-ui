import React from "react";
import clsx from "clsx";
import { TRegularSizes } from "../../types";
import { Segment } from "./segment";
import "./segmented-control.scss";

interface Option {
    disabled?: boolean;
    icon?: string | React.ReactNode;
    label?: string;
    selected?: boolean;
}

export interface SegmentedControlProps {
    className?: string;
    options: Array<Option>;
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
    const [allowFocus, setAllowFocus] = React.useState(true);

    const handleKeyboardEvents = (
        e: React.KeyboardEvent<HTMLButtonElement>,
        idx: number,
    ) => {
        const selectedOptionIdx = options.findIndex(
            (option) => option.selected,
        );
        setAllowFocus(["Tab", "Enter", " "].includes(e.key));
        if (!options[idx].disabled && ["Enter", " "].includes(e.key)) {
            onChange?.(idx);
        }
        if (e.key === "ArrowLeft") {
            // @ts-expect-error: es2023 supports findLastIndex, it works but TS doesn't recognize it
            const previousEnabledOptionIdx = options.findLastIndex(
                (option: Option, i: number) =>
                    i < selectedOptionIdx && !option.disabled,
            );
            if (previousEnabledOptionIdx !== -1) {
                onChange?.(previousEnabledOptionIdx);
            }
        }
        if (e.key === "ArrowRight") {
            const nextEnabledOptionIdx = options.findIndex(
                (option, i) => i > selectedOptionIdx && !option.disabled,
            );
            if (nextEnabledOptionIdx !== -1) {
                onChange?.(nextEnabledOptionIdx);
            }
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
                        allowFocus={allowFocus}
                        key={`${idx}_${label}`}
                        icon={icon}
                        isDisabled={disabled}
                        isSelected={selected}
                        label={label}
                        onClick={() => onChange?.(idx)}
                        onKeyDown={(
                            e: React.KeyboardEvent<HTMLButtonElement>,
                        ) => handleKeyboardEvents(e, idx)}
                        size={size}
                        ref={segmentRef}
                    />
                );
            })}
        </div>
    );
};
