import { Listbox } from "@headlessui/react";
import React, { Fragment } from "react";
import DropdownItem, { DropdownItemProps } from "../dropdown-item";
import clsx from "clsx";
import { SingleSelectChipProps } from "@components/Button";

export type TSingleSelectItem = {
    value: number | string;
    label: React.ReactNode;
    disabled?: boolean;
};

export interface OptionProps extends DropdownItemProps {
    item: TSingleSelectItem;
}

const Option = ({ item, centered }: OptionProps) => {
    return (
        <Listbox.Option value={item} as={Fragment} disabled={item.disabled}>
            {({ disabled, selected }) => (
                <DropdownItem
                    label={item.label}
                    selected={selected}
                    disabled={disabled}
                    centered={centered}
                />
            )}
        </Listbox.Option>
    );
};

export const DropdownList = ({ ...rest }: SingleSelectChipProps) => {
    return (
        <Listbox.Options
            className={clsx("dropdown", `dropdown__size--${size}`, className)}
        >
            <Option item={defaultOption} size={size} />
            {options.map((item) => (
                <Option
                    item={item}
                    key={`chip-selectable-item-${item.value}`}
                    size={size}
                />
            ))}
        </Listbox.Options>
    );
};

export default DropdownList;
