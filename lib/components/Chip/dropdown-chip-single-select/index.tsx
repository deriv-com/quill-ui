import React from "react";

import { Fragment, forwardRef } from "react";
import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Base } from "../base";
import type { TSingleSelectItem, SingleSelectChipProps } from "../types";
import clsx from "clsx";
import "./dropdown-chip-single-select.scss";
import { TRegularSizes } from "@types";
import { Text } from "@components/Typography";

const Options = ({
    item,
    size,
}: {
    item: TSingleSelectItem;
    size: TRegularSizes;
}) => {
    return (
        <Listbox.Option value={item} as={Fragment} disabled={item.disabled}>
            {({ disabled, selected }) => (
                <li
                    className={clsx(
                        "dropdown-item",
                        `dropdown-item__size--${size}`,
                        `dropdown-item__selected--${selected}`,
                        `dropdown-item__disabled--${disabled}`,
                    )}
                >
                    <Text size="sm" color="white">
                        {item.label}
                    </Text>
                </li>
            )}
        </Listbox.Option>
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
            <div className="flex flex-col">
                <Listbox value={selectedItem} onChange={handleItemSelect}>
                    {({ open }) => (
                        <>
                            <Listbox.Button as="div">
                                <Base
                                    {...rest}
                                    icon={icon}
                                    size={size}
                                    labelTag={labelTag}
                                    ref={ref}
                                    dropdown
                                    selected={
                                        selectedItem.value !==
                                        defaultOption.value
                                    }
                                    className="dropdown-button"
                                    isDropdownOpen={open}
                                    disabled={disabled}
                                    label={selectedItem?.label}
                                />
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
                                    <Options item={defaultOption} size={size} />
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
            </div>
        );
    },
);

DropdownChipSingleSelect.displayName = "DropdownChipSingleSelect";

export default DropdownChipSingleSelect;
