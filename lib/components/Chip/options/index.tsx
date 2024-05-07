import React from "react";
import { Fragment } from "react";
import { Listbox } from "@headlessui/react";
import type { TSingleSelectItem } from "../types";
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
                />
            )}
        </Listbox.Option>
    );
};

export default Options;
