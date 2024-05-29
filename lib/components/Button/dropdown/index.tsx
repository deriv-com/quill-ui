import { Fragment, forwardRef } from "react";
import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ButtonProps } from "../types";
import clsx from "clsx";
import { Button } from "../base";
import "./dropdown.scss";
import { Text, CaptionText } from "@components/Typography";
import { TRegularSizesWithExtraLarge } from "@types";
import { DropdownItem } from "@components/Atom";

export type TSingleSelectItem = {
    value: number | string;
    label: string | React.ReactNode;
};

export interface SingleSelectDropdownProps extends ButtonProps {
    options: TSingleSelectItem[];
    defaultOption: TSingleSelectItem;
    onSelectionChange?: (item: TSingleSelectItem) => void;
    size?: TRegularSizesWithExtraLarge;
}

const Options = ({
    item,
    size,
}: {
    item: TSingleSelectItem;
    size: TRegularSizesWithExtraLarge;
}) => {
    const itemSize = size === "sm" ? "sm" : size === "md" ? "sm" : "md";
    return (
        <Listbox.Option value={item} as={Fragment}>
            {({ selected, disabled, active }) => {
                return (
                    <DropdownItem
                        className={clsx(`dropdown-menu__item--${active}`)}
                        label={item.label}
                        disabled={disabled}
                        selected={selected}
                        size={itemSize}
                    />
                );
            }}
        </Listbox.Option>
    );
};

export const DropdownButton = forwardRef<
    HTMLButtonElement,
    SingleSelectDropdownProps
>(
    (
        {
            defaultOption,
            size = "md",
            icon,
            label,
            color = "coral",
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
                                    color={color}
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
                                        <CaptionText color={color} bold>
                                            {selectedItem.label}
                                        </CaptionText>
                                    ) : (
                                        <Text
                                            size={labelSize}
                                            bold
                                            color={color}
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
                                    <Options item={defaultOption} size={size} />
                                    {options.map((item) => (
                                        <Options
                                            item={item}
                                            key={item.value}
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

DropdownButton.displayName = "DropdownButton";

export default DropdownButton;
