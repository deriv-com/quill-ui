import { Combobox, Listbox } from "@headlessui/react";
import React, { Fragment } from "react";
import DropdownItem, { DropdownItemProps } from "../dropdown-item";
import clsx from "clsx";
import "./list.scss";

export type TSingleSelectItem = {
    value: number | string;
    label: React.ReactNode;
    disabled?: boolean;
};

export interface OptionProps extends Omit<DropdownItemProps, "label"> {
    item: TSingleSelectItem;
    type: "combobox" | "listbox";
}

const Option = ({ item, centered, type, ...rest }: OptionProps) => {
    const Box = {
        combobox: Combobox.Option,
        listbox: Listbox.Option,
    }[type];

    return (
        <Box value={item} as={Fragment} disabled={item.disabled}>
            {({ disabled, selected }) => (
                <DropdownItem
                    label={item.label}
                    selected={selected}
                    disabled={disabled}
                    centered={centered}
                    {...rest}
                />
            )}
        </Box>
    );
};

export interface DropdownListProps extends Omit<OptionProps, "item"> {
    options: TSingleSelectItem[];
    defaultOption: TSingleSelectItem;
}

export const DropdownList = ({
    type,
    size,
    className,
    options,
    defaultOption,
    ...rest
}: DropdownListProps) => {
    const Options = {
        combobox: Combobox.Options,
        listbox: Listbox.Options,
    }[type];

    return (
        <Options
            className={clsx("dropdown", `dropdown__size--${size}`, className)}
        >
            {defaultOption && (
                <Option
                    item={defaultOption}
                    size={size}
                    type={type}
                    {...rest}
                />
            )}
            {options.map((item) => (
                <Option item={item} size={size} type={type} {...rest} />
            ))}
        </Options>
    );
};

export default DropdownList;
