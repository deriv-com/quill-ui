import React from "react";

import { Fragment, forwardRef } from "react";
import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Base } from "../base";
import type { TSingleSelectItem, SingleSelectChipProps } from "../types";
import clsx from "clsx";
import "./dropdown-chip-single-select.scss";
import { TRegularSizes } from "@types";

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
                    )}
                >
                    {item.label}
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
                                    isDropdownOpen={open}
                                    disabled={disabled}
                                    label={selectedItem?.label}
                                />
                            </Listbox.Button>
                            <Transition
                                enter="transition ease-out duration-200 scale transform"
                                enterFrom="scale-y-0"
                                enterTo="scale-y-full"
                                leave="transition ease-out duration-200 scale transform"
                                leaveFrom="scale-y-0 translate-y-0"
                                leaveTo="scale-y-0 -translate-y-2/4"
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
