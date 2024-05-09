import React, { Fragment, forwardRef, useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import Input from "../base";
import { TextFieldProps } from "../text-field";
import { LabelPairedChevronDownSmBoldIcon } from "@deriv/quill-icons/LabelPaired";
import clsx from "clsx";
import { TMediumSizes } from "@types";
import "./dropdown.scss";
import { DropdownItem } from "@components/Atom";

export interface TSingleSelectItem {
    label: string | number;
}
export type TSingleSelectOption = {
    value: number | string;
    label: string;
};

export type TDropdownOption = {
    item: TSingleSelectOption;
    inputSize: TMediumSizes;
    textAlignment?: "left" | "center";
    closeDropdown: () => void;
    handleKeyDown: (e: React.KeyboardEvent) => void;
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
}: TDropdownOption) => {
    return (
        <Combobox.Option value={item.label} as={Fragment} key={item.value}>
            {({ selected, active }) => {
                return (
                    <DropdownItem
                        onClick={closeDropdown}
                        onKeyDown={handleKeyDown}
                        label={item.label}
                        selected={selected}
                        size={inputSize}
                        active={active}
                        textAlignment={textAlignment}
                    ></DropdownItem>
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
            ...rest
        },
        ref,
    ) => {
        const [isDropdownOpen, setDropdownOpen] = useState(false);

        const [selectedItem, setSelectedItem] =
            useState<TSingleSelectOption[]>();

        const [query, setQuery] = useState("");

        const filteredOption =
            query === ""
                ? options
                : options?.filter((option) => {
                      return option.label
                          .toLowerCase()
                          .includes(query.toLowerCase());
                  });
        useEffect(() => {
            if (query === "") {
                setDropdownOpen(!isDropdownOpen);
            }
            console.log("query", query);
        }, []);

        console.log("query", query);

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
        console.log("filteredOption", filteredOption);
        console.log("selectedItem", selectedItem);
        return (
            <Combobox
                disabled={disabled}
                value={selectedItem}
                onChange={setSelectedItem}
            >
                <Combobox.Input
                    as={Input}
                    type="select"
                    className="dropdown__input"
                    data-testid="dropdown-input"
                    inputSize={inputSize}
                    textAlignment={textAlignment}
                    message={message}
                    onClick={handleDropdownClick}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={handleKeyDown}
                    {...rest}
                    triggerActionIcon={
                        <LabelPairedChevronDownSmBoldIcon
                            data-state={isDropdownOpen ? "open" : "close"}
                            width={24}
                            height={24}
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
                        {filteredOption?.map((item) => (
                            <Options
                                item={item}
                                key={item.value}
                                closeDropdown={closeDropdown}
                                handleKeyDown={handleKeyDown}
                                inputSize={inputSize}
                                textAlignment={textAlignment}
                            />
                        ))}
                    </div>
                )}
            </Combobox>
        );
    },
);

export default InputDropdown;
