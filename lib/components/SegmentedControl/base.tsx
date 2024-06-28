import React, {
    KeyboardEvent,
    ReactNode,
    RefObject,
    useEffect,
    useState,
} from "react";
import { TRegularSizes } from "@types";
import { KEY } from "@utils/common-utils";
import { Segment } from "./segment";
import "./segmented-control.scss";

export interface Option {
    disabled?: boolean;
    icon?: ReactNode;
    label?: ReactNode;
    selected?: boolean;
}

export interface SegmentedControlProps {
    className?: string;
    hasAnimation?: boolean;
    options: Array<Option>;
    onChange?: (selectedItemIndex: number) => void;
    size?: TRegularSizes;
}

export const SegmentedControl = ({
    className,
    hasAnimation,
    options = [],
    onChange,
    size = "md",
}: SegmentedControlProps) => {
    const [allowFocus, setAllowFocus] = useState(true);
    const [animatedOptionIdx, setAnimatedOptionIdx] = useState<number | null>(
        null,
    );
    const selectedRef = React.useRef<HTMLButtonElement | null>(null);

    const animate = (idx: number, ref: RefObject<HTMLButtonElement>) => {
        if (hasAnimation && ref?.current) {
            const x =
                selectedRef?.current === null
                    ? "0%"
                    : selectedRef?.current?.offsetLeft -
                      ref.current.offsetLeft +
                      "px";
            if (selectedRef?.current !== null) {
                selectedRef.current.style.removeProperty("--x");
            }
            ref.current.style.setProperty("--x", x);
            setAnimatedOptionIdx(idx);
        }
    };

    const handleKeyboardEvents = (
        e: KeyboardEvent<HTMLButtonElement>,
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

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;
        if (selectedRef?.current && hasAnimation) {
            timeoutId = setTimeout(() => {
                selectedRef.current?.style.removeProperty("--x");
            }, 150);
        }
        return () => timeoutId && clearTimeout(timeoutId);
    }, [options]);

    const segmentRef = React.useRef<HTMLButtonElement>(null);

    return (
        <div className={className}>
            {options.map(({ disabled, icon, label, selected }, idx) => {
                return (
                    <Segment
                        allowFocus={allowFocus}
                        key={`${idx}_${label}`}
                        icon={icon}
                        isAnimated={
                            selected &&
                            animatedOptionIdx === idx &&
                            hasAnimation
                        }
                        isDisabled={disabled}
                        isSelected={selected}
                        label={label}
                        onClick={() => {
                            animate(idx, segmentRef);
                            onChange?.(idx);
                            setAllowFocus(false);
                        }}
                        onKeyDown={(
                            e: React.KeyboardEvent<HTMLButtonElement>,
                        ) => handleKeyboardEvents(e, idx)}
                        size={size}
                        ref={selected ? selectedRef : segmentRef}
                    />
                );
            })}
        </div>
    );
};
