import React, { useEffect } from "react";
import clsx from "clsx";
import { SegmentedControl } from "../base";
import type { Option, SegmentedControlProps } from "../base";

export interface SegmentedControlSingleChoiceProps
    extends SegmentedControlProps {
    hasContainerWidth?: boolean;
    options: Array<Omit<Option, "selected">>;
    selectedItemIndex?: number;
}

export const SegmentedControlSingleChoice = ({
    className,
    options = [],
    onChange,
    hasContainerWidth,
    selectedItemIndex = 0,
    size = "md",
}: SegmentedControlSingleChoiceProps) => {
    const [items, setItems] =
        React.useState<SegmentedControlProps["options"]>(options);

    const updateItems = (
        new_options: SegmentedControlProps["options"],
        idx: number,
    ) => {
        if (idx >= new_options.length) return;
        setItems([
            ...new_options.map((item, i) => ({
                ...item,
                selected: !item.disabled && i === idx,
            })),
        ]);
    };

    const handleItemClick = (idx: number) => {
        updateItems(items, idx);
        onChange?.(idx);
    };

    useEffect(() => {
        const selected = items.findIndex((i) => i.selected);
        const currentIndex = selected !== -1 ? selected : 0;
        const newIndex = items[selectedItemIndex]?.disabled
            ? currentIndex
            : selectedItemIndex;
        updateItems(
            options,
            selectedItemIndex === selected ? currentIndex : newIndex,
        );
    }, [options, selectedItemIndex]);

    if (!options.length) return null;
    return (
        <SegmentedControl
            className={clsx(
                "segmented-control-single",
                `segmented-control-single--${size}`,
                hasContainerWidth &&
                    "segmented-control-single--has-container-width",
                className,
            )}
            hasAnimation
            options={items}
            onChange={handleItemClick}
            size={size}
        />
    );
};

export default SegmentedControlSingleChoice;
