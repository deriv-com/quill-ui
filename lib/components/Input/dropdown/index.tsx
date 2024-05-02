import React, { Fragment, forwardRef, useState } from "react";
import { Combobox } from "@headlessui/react";
import Input from "../base";
import { TextFieldProps } from "../text-field";
import { LabelPairedChevronDownSmBoldIcon } from "@deriv/quill-icons/LabelPaired";
import clsx from "clsx";
import { Text } from "@components/Typography";
import { TMediumSizes } from "@types";
import "./dropdown.scss";

const people = [
    "Durward Reynolds",
    "Kenton Towne",
    "Therese Wunsch",
    "Benedict Kessler",
    "Katelyn Rohan",
];
export type TSingleSelectItem = {
    value: number | string;
    label: string | React.ReactNode;
};
export interface DropdownOptionProps {
    item: string;
    closeDropdown: () => void;
    inputSize?: TMediumSizes;
    handleKeyDown: (e: React.KeyboardEvent) => void;
}

const Options = ({
    item,
    inputSize,
    closeDropdown,
    handleKeyDown,
}: DropdownOptionProps) => {
    return (
        <Combobox.Option value={item} as={Fragment}>
            {({ selected, active }) => {
                return (
                    <Combobox.Button
                        onKeyDown={handleKeyDown}
                        onClick={closeDropdown}
                        className={clsx(
                            "dropdown__item",
                            `dropdown__item--size-${inputSize}`,
                            selected && "dropdown__item--selected",
                            active && `dropdown__item--active`,
                        )}
                    >
                        <Text
                            as="span"
                            color="var(--component-dropdownItem-label-color-selectedWhite)"
                        >
                            {item}
                        </Text>
                    </Combobox.Button>
                );
            }}
        </Combobox.Option>
    );
};

export const InputDropdown = forwardRef<HTMLInputElement, TextFieldProps>(
    ({ inputSize = "md", ...rest }, ref) => {
        const [isDropdownOpen, setDropdownOpen] = useState(false);
        const handleDropdownClick = () => {
            setDropdownOpen(!isDropdownOpen);
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
            <Combobox>
                <Combobox.Input
                    as={Input}
                    type="select"
                    readOnly
                    inputSize={inputSize}
                    onClick={handleDropdownClick}
                    onKeyDown={handleKeyDown}
                    {...rest}
                    rightIcon={
                        <LabelPairedChevronDownSmBoldIcon
                            data-state={isDropdownOpen ? "open" : "close"}
                            className={clsx(
                                "quill-button__transform",
                                isDropdownOpen &&
                                    "quill-button__transform-rotate",
                            )}
                        />
                    }
                    ref={ref}
                />

                {isDropdownOpen && (
                    <div className="dropdown__container">
                        {people.map((person) => (
                            <Options
                                item={person}
                                key={person}
                                closeDropdown={closeDropdown}
                                handleKeyDown={handleKeyDown}
                                inputSize={inputSize}
                            />
                        ))}
                    </div>
                )}
            </Combobox>
        );
    },
);

export default InputDropdown;
