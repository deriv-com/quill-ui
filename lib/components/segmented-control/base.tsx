import React from "react";
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
    size?: TRegularSizes;
}

const KEY = {
    ARROW_LEFT: "ArrowLeft",
    ARROW_RIGHT: "ArrowRight",
    ENTER: "Enter",
    SPACE: " ",
    TAB: "Tab",
};

export const SegmentedControl = ({
    className,
    options = [],
    onChange,
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
        setAllowFocus([KEY.TAB, KEY.ENTER, KEY.SPACE].includes(e.key));
        if (!options[idx].disabled && [KEY.ENTER, KEY.SPACE].includes(e.key)) {
            onChange?.(idx);
        }
        if (e.key === KEY.ARROW_LEFT) {
            const previousEnabledOptionIdx = options.findLastIndex(
                (option, i) => i < selectedOptionIdx && !option.disabled,
            );
            if (previousEnabledOptionIdx !== -1) {
                onChange?.(previousEnabledOptionIdx);
            }
        }
        if (e.key === KEY.ARROW_RIGHT) {
            const nextEnabledOptionIdx = options.findIndex(
                (option, i) => i > selectedOptionIdx && !option.disabled,
            );
            if (nextEnabledOptionIdx !== -1) {
                onChange?.(nextEnabledOptionIdx);
            }
        }
    };

    return (
        <div className={className}>
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
