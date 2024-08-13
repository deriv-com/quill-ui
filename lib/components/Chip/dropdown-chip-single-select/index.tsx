import React from "react";

import { Fragment, forwardRef } from "react";
import { useState } from "react";
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Transition,
} from "@headlessui/react";
import { Chip } from "../base";
import type { TSingleSelectItem, SingleSelectChipProps } from "../types";
import clsx from "clsx";
import "./dropdown-chip-single-select.scss";
import { TMediumSizes, TRegularSizes } from "@types";
import { DropdownItem } from "@components/Atom";

export interface OptionsProps {
    item: TSingleSelectItem;
    size: TRegularSizes;
}

const Option = ({ item, size }: OptionsProps) => {
    const itemSize: Record<TRegularSizes, TMediumSizes> = {
        sm: "sm",
        md: "sm",
        lg: "md",
    };

    return (
        <ListboxOption value={item} as={Fragment} disabled={item.disabled}>
            {({ disabled, selected }) => (
                <DropdownItem
                    label={item.label}
                    disabled={disabled}
                    selected={selected}
                    size={itemSize[size]}
                />
            )}
        </ListboxOption>
    );
};

export const DropdownChipSingleSelect = forwardRef<
    HTMLButtonElement,
    SingleSelectChipProps
>(
    (
        {
            defaultOption,
            size = "md",
            icon,
            labelTag,
            disabled,
            options,
            onSelectionChange,
            className,
            ...rest
        },
        ref,
    ) => {
        const [selectedItem, setSelectedItem] =
            useState<TSingleSelectItem>(defaultOption);

        const handleItemSelect = (item: TSingleSelectItem) => {
            setSelectedItem(item);
            onSelectionChange?.(item);
        };

        return (
            <Listbox
                value={selectedItem}
                onChange={handleItemSelect}
                disabled={disabled}
            >
                {({ open }) => (
                    <>
                        <ListboxButton as="div">
                            <Chip
                                {...rest}
                                icon={icon}
                                size={size}
                                labelTag={labelTag}
                                ref={ref}
                                dropdown
                                selected={
                                    selectedItem.value !== defaultOption.value
                                }
                                className="dropdown-button"
                                isDropdownOpen={open}
                                disabled={disabled}
                                label={selectedItem?.label}
                            />
                        </ListboxButton>
                        <Transition
                            enter="enter"
                            enterFrom="enter-from"
                            enterTo="enter-to"
                            leave="leave"
                            leaveFrom="enter-from"
                            leaveTo="leave-to"
                        >
                            <ListboxOptions
                                className={clsx(
                                    "dropdown",
                                    `dropdown__size--${size}`,
                                    className,
                                )}
                            >
                                <Option item={defaultOption} size={size} />
                                {options.map((item) => (
                                    <Option
                                        item={item}
                                        key={`chip-selectable-item-${item.value}`}
                                        size={size}
                                    />
                                ))}
                            </ListboxOptions>
                        </Transition>
                    </>
                )}
            </Listbox>
        );
    },
);

DropdownChipSingleSelect.displayName = "DropdownChipSingleSelect";

export default DropdownChipSingleSelect;
