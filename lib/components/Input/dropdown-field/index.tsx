import React, { Fragment, forwardRef, useState } from "react";
import { Combobox } from "@headlessui/react";
import Input from "../base";
import { TextFieldProps } from "../text-field";
import { LabelPairedChevronDownSmBoldIcon } from "@deriv/quill-icons/LabelPaired";
import clsx from "clsx";
import { Text } from "@components/Typography";
import { TMediumSizes } from "@types";
import "./dropdown.scss";

export type TSingleSelectOption = {
    value: number | string;
    label: string | React.ReactNode;
};

export type TDropdownOption = {
    item: TSingleSelectOption;
    inputSize: TMediumSizes;
    textAlignment?: "left" | "center";
    closeDropdown: () => void;
    handleKeyDown: (e: React.KeyboardEvent) => void;
    handleSelection: (value: React.ReactNode | string) => void;
};

export interface DropdownOptionProps extends TextFieldProps {
    options?: TSingleSelectOption[];
    defaultOption?: TSingleSelectOption;
}

const Options = ({
    item,
    inputSize,
    textAlignment,
    closeDropdown,
    handleKeyDown,
    handleSelection,
}: TDropdownOption) => {
    return (
        <Combobox.Option value={item.label} as={Fragment}>
            {({ selected, active }) => {
                return (
                    <Combobox.Button
                        onKeyDown={handleKeyDown}
                        onClick={closeDropdown}
                        onSelect={() => handleSelection(item.label)}
                        className={clsx(
                            "dropdown__item",
                            `dropdown__item--size-${inputSize}`,
                            `dropdown__item__align-${textAlignment}`,
                            selected && "dropdown__item--selected",
                            active && `dropdown__item--active`,
                        )}
                    >
                        <Text
                            as="span"
                            color="var(--component-dropdownItem-label-color-selectedWhite)"
                        >
                            {item.label}
                        </Text>
                    </Combobox.Button>
                );
            }}
        </Combobox.Option>
    );
};

export const InputDropdown = forwardRef<HTMLInputElement, DropdownOptionProps>(
    (
        {
            inputSize = "md",
            message,
            textAlignment,
            options,
            disabled,
            onSelect,
            ...rest
        },
        ref,
    ) => {
        const [isDropdownOpen, setDropdownOpen] = useState(false);
        const [selectedValue, setSelectedValue] = useState<
            null | React.ReactNode | string
        >(null);
        const handleDropdownClick = () => {
            setDropdownOpen(!isDropdownOpen);
        };
        const handleSelection = (value: null | React.ReactNode | string) => {
            setSelectedValue(value);
            if (onSelect) {
                onSelect?.({
                    target: { value },
                } as React.ChangeEvent<HTMLInputElement>);
            }
        };

        const closeDropdown = () => {
            setDropdownOpen(false);
        };
        const handleKeyDown = (event: { key: string }) => {
            if (event.key === "Enter") {
                setDropdownOpen(false);
            }
        };

        return (
            <Combobox disabled={disabled}>
                <Combobox.Input
                    as={Input}
                    type="select"
                    readOnly
                    className="dropdown__input"
                    data-testid="dropdown-input"
                    inputSize={inputSize}
                    textAlignment={textAlignment}
                    message={message}
                    onClick={handleDropdownClick}
                    onKeyDown={handleKeyDown}
                    value={selectedValue}
                    {...rest}
                    triggerActionIcon={
                        <LabelPairedChevronDownSmBoldIcon
                            data-state={isDropdownOpen ? "open" : "close"}
                            className={clsx(
                                "dropdown__transform",
                                isDropdownOpen && "dropdown__transform-rotate",
                            )}
                        />
                    }
                    ref={ref}
                />

                {isDropdownOpen && (
                    <div
                        className={clsx(
                            "dropdown__container",
                            `dropdown__container--size-${inputSize}`,
                        )}
                    >
                        {options?.map((item) => (
                            <Options
                                item={item}
                                key={item.value}
                                closeDropdown={closeDropdown}
                                handleKeyDown={handleKeyDown}
                                inputSize={inputSize}
                                textAlignment={textAlignment}
                                handleSelection={handleSelection}
                            />
                        ))}
                    </div>
                )}
            </Combobox>
        );
    },
);

export default InputDropdown;
