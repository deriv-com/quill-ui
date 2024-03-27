import React, { useEffect } from "react";
import { SegmentedControl } from "../base";
import type { SegmentedControlProps } from "../base";

export interface SegmentedControlSingleChoiceProps
    extends SegmentedControlProps {
    options: Array<{ icon?: string | React.ReactNode; label?: string }>;
    selectedItemIndex?: number;
}

const SegmentedControlSingleChoice = ({
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
                selected: i === idx,
            })),
        ]);
    };

    const handleItemClick = (idx: number) => {
        updateItems(items, idx);
        onChange?.(idx);
    };

    useEffect(() => {
        const selected = items.findIndex((i) => i.selected);
        if (selectedItemIndex !== selected) {
            updateItems(items, selectedItemIndex);
        } else {
            updateItems(options, selected !== -1 ? selected : 0);
        }
    }, [options, selectedItemIndex]);

    if (!options.length) return null;
    return (
        <SegmentedControl
            className={className}
            options={items}
            onChange={handleItemClick}
            hasContainerWidth={hasContainerWidth}
            size={size}
        />
    );
};

export default SegmentedControlSingleChoice;
