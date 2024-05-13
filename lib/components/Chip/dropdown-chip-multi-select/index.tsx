import React from "react";

import { Fragment, forwardRef } from "react";
import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Chip, LabelTextSizes } from "../base";
import type { TSingleSelectItem, MultiSelectChipProps } from "../types";
import clsx from "clsx";
import "../dropdown-chip-single-select/dropdown-chip-single-select.scss";
import { TMediumSizes, TRegularSizes } from "@types";
import { DropdownItem } from "@components/Atom";

export interface OptionsProps {
    item: TSingleSelectItem;
    size: TRegularSizes;
}

const Options = ({ item, size }: OptionsProps) => {
    const itemSize: Record<TRegularSizes, TMediumSizes> = {
        sm: "sm",
        md: "sm",
        lg: "md",
    };

    return (
        <Listbox.Option value={item} as={Fragment} disabled={item.disabled}>
            {({ disabled, selected }) => (
                <DropdownItem
                    label={item.label}
                    disabled={disabled}
                    selected={selected}
                    size={itemSize[size]}
                    checkbox
                />
            )}
        </Listbox.Option>
    );
};

export const DropdownChipMultiSelect = forwardRef<
    HTMLButtonElement,
    MultiSelectChipProps
>(
    (
        {
            size = "md",
            icon,
            labelTag,
            disabled,
            options,
            onSelectionChange,
            className,
            label,
            ...rest
        },
        ref,
    ) => {
        const [selectedItems, setSelectedItems] = useState<TSingleSelectItem[]>(
            [],
        );

        const handleItemSelect = (items: TSingleSelectItem[]) => {
            setSelectedItems(items);
            onSelectionChange?.(items);
        };

        return (
            <Listbox
                value={selectedItems}
                onChange={handleItemSelect}
                multiple
                disabled={disabled}
            >
                {({ open }) => (
                    <>
                        <Listbox.Button as="div">
                            <Chip
                                {...rest}
                                icon={icon}
                                size={size}
                                labelTag={labelTag}
                                ref={ref}
                                dropdown
                                selected={selectedItems.length > 0}
                                isDropdownOpen={open}
                                disabled={disabled}
                                label={label}
                            >
                                {selectedItems.length > 0 &&
                                    React.cloneElement(LabelTextSizes[size], {
                                        children: `(${selectedItems.length})`,
                                    })}
                            </Chip>
                        </Listbox.Button>
                        <Transition
                            enter="enter"
                            enterFrom="enter-from"
                            enterTo="enter-to"
                            leave="leave"
                            leaveFrom="enter-from"
                            leaveTo="leave-to"
                        >
                            <Listbox.Options
                                className={clsx(
                                    "dropdown",
                                    `dropdown__size--${size}`,
                                    className,
                                )}
                            >
                                {options.map((item) => (
                                    <Options
                                        item={item}
                                        key={`chip-selectable-item-${item.value}`}
                                        size={size}
                                    />
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </>
                )}
            </Listbox>
        );
    },
);

DropdownChipMultiSelect.displayName = "DropdownChipMultiSelect";

export default DropdownChipMultiSelect;
