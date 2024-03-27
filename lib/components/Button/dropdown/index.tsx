import { Fragment, forwardRef } from "react";
import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ButtonProps } from "../types";
import clsx from "clsx";
import { Button } from "../base";
import "./dropdown.scss";
import { Text } from "../../Typography/text";
import { CaptionText } from "../../Typography/caption";

export type TSingleSelectItem = {
    value: number | string;
    label: string | React.ReactNode;
};

export interface SingleSelectChipProps extends ButtonProps {
    options: TSingleSelectItem[];
    defaultOption: TSingleSelectItem;
    onSelectionChange?: (item: TSingleSelectItem) => void;
}

const Options = ({ item }: { item: TSingleSelectItem }) => {
    return (
        <Listbox.Option value={item} as={Fragment}>
            {({ selected }) => (
                <li
                    className={clsx(
                        "dropdown-menu__item",
                        selected && `dropdown-menu__item--selected`,
                    )}
                >
                    <Text as="span"> {item.label}</Text>
                </li>
            )}
        </Listbox.Option>
    );
};

export const DropdownButton = forwardRef<
    HTMLButtonElement,
    SingleSelectChipProps
>(
    (
        {
            defaultOption,
            size,
            icon,
            label,
            colorStyle = "coral",
            variant,
            disabled,
            options,
            onSelectionChange,
            ...rest
        },
        ref,
    ) => {
        const labelSize = size === "md" ? "sm" : size === "lg" ? "md" : "xl";
        const [selectedItem, setSelectedItem] =
            useState<TSingleSelectItem>(defaultOption);

        const handleItemSelect = (item: TSingleSelectItem) => {
            setSelectedItem(item);
            onSelectionChange?.(item);
        };

        return (
            <div>
                <Listbox value={selectedItem} onChange={handleItemSelect}>
                    {({ open }) => (
                        <>
                            <Listbox.Button
                                as="div"
                                className="dropdown-menu__box"
                            >
                                <Button
                                    {...rest}
                                    icon={icon}
                                    size={size}
                                    colorStyle={colorStyle}
                                    label={label}
                                    variant={variant}
                                    ref={ref}
                                    dropdown
                                    selected={
                                        selectedItem.value !==
                                        defaultOption.value
                                    }
                                    isDropdownOpen={open}
                                    disabled={disabled}
                                >
                                    {size === "sm" ? (
                                        <CaptionText color={colorStyle} bold>
                                            {selectedItem.label}
                                        </CaptionText>
                                    ) : (
                                        <Text
                                            size={labelSize}
                                            bold
                                            color={colorStyle}
                                        >
                                            {selectedItem.label}
                                        </Text>
                                    )}
                                </Button>
                            </Listbox.Button>
                            <Transition
                                enter={clsx("dropdown-menu__transition--enter")}
                            >
                                <Listbox.Options
                                    className={clsx("dropdown-menu__container")}
                                >
                                    <Options item={defaultOption} />
                                    {options.map((item) => (
                                        <Options item={item} key={item.value} />
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

DropdownButton.displayName = "DropdownButton";

export default DropdownButton;
