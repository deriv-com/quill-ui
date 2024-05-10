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
    id: number;
    number: string;
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
        <Combobox.Option value={item.name} as={Fragment} key={item.id}>
            {({ selected, active }) => {
                return (
                    <DropdownItem
                        onClick={closeDropdown}
                        onKeyDown={handleKeyDown}
                        label={item.name}
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
        const people = [
            { id: 1, name: "Durward Reynolds" },
            { id: 2, name: "Kenton Towne" },
            { id: 3, name: "Therese Wunsch" },
            { id: 4, name: "Benedict Kessler" },
            { id: 5, name: "Katelyn Rohan" },
        ];
        const [selectedPerson, setSelectedPerson] = useState(null);
        const [query, setQuery] = useState("");
        const [filteredPeople, setFilteredPeople] = useState(people);

        console.log("filteredPeople", filteredPeople);
        console.log("selectedPerson", selectedPerson);
        console.log("query", query);
        useEffect(() => {
            if (query === "") {
                setSelectedPerson(null);
            }
        }, [query]);

        const [isDropdownOpen, setDropdownOpen] = useState(false);

        const [selectedItem, setSelectedItem] =
            useState<TSingleSelectOption[]>();

        const handleDropdownClick = () => {
            setDropdownOpen(true);
            const filteredPeople =
                query === ""
                    ? people
                    : people.filter((person) => {
                          return person.name
                              .toLowerCase()
                              .includes(query.toLowerCase());
                      });
            setFilteredPeople(filteredPeople);
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
            <Combobox value={selectedPerson} onChange={setSelectedPerson}>
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
                    value={selectedPerson}
                    {...rest}
                    ref={ref}
                />
                {isDropdownOpen && query === "" && (
                    <div
                        className={clsx(
                            "dropdown__container",
                            `dropdown__container--size-${inputSize}`,
                        )}
                    >
                        {filteredPeople?.map((item) => (
                            <Options
                                item={item}
                                key={item.id}
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
