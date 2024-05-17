import React, { Fragment, forwardRef, useEffect, useState } from "react";
import clsx from "clsx";
import { Combobox } from "@headlessui/react";
import { LabelPairedChevronDownSmBoldIcon } from "@deriv/quill-icons/LabelPaired";
import { TLeftOrCenter, TMediumSizes } from "@types";
import { DropdownItem } from "@components/Atom";
import Input from "../base";
import { TextFieldProps } from "../text-field";
import "./dropdown.scss";

export type TSingleSelectOption = {
    id: string | number;
    name: string;
};

export type TDropdownOption = {
    item: TSingleSelectOption;
    inputSize: TMediumSizes;
    textAlignment?: TLeftOrCenter;
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
                        className={clsx(
                            active && !selected && "dropdown__item--active",
                        )}
                        onClick={closeDropdown}
                        onKeyDown={handleKeyDown}
                        label={item.name}
                        selected={selected}
                        size={inputSize}
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
            disabled,
            options,
            ...rest
        },
        ref,
    ) => {
        const [isDropdownOpen, setDropdownOpen] = useState(false);

        const [selectedOption, setselectedOption] = useState("");
        const [query, setQuery] = useState("");
        const [filteredOption, setfilteredOption] = useState(options);

        useEffect(() => {
            const filteredOption = options?.filter((option) => {
                return option?.name
                    ?.toLowerCase()
                    .includes(query.toLowerCase());
            });
            if (query.length > 0) setDropdownOpen(true);
            setfilteredOption(filteredOption);
        }, [query, selectedOption]);

        useEffect(() => {
            if (query === "") {
                setselectedOption("");
            }
        }, [query]);

        const handleDropdownClick = () => {
            setDropdownOpen(!isDropdownOpen);
        };

        const closeDropdown = () => {
            setDropdownOpen(!isDropdownOpen);
        };
        const handleKeyDown = (event: { key: string }) => {
            if (event.key === "Enter") {
                setDropdownOpen(!isDropdownOpen);
            }
        };

        return (
            <Combobox
                value={selectedOption}
                onChange={setselectedOption}
                disabled={disabled}
            >
                <>
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
                        value={selectedOption}
                        triggerActionIcon={
                            <LabelPairedChevronDownSmBoldIcon
                                data-state={isDropdownOpen ? "open" : "close"}
                                width={24}
                                height={24}
                                className={clsx(
                                    "dropdown__transform",
                                    "dropdown__icon-svg",
                                    isDropdownOpen &&
                                        "dropdown__transform-rotate",
                                )}
                            />
                        }
                        {...rest}
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
                                    key={item.id}
                                    closeDropdown={closeDropdown}
                                    handleKeyDown={handleKeyDown}
                                    inputSize={inputSize}
                                    textAlignment={textAlignment}
                                />
                            ))}
                        </div>
                    )}
                </>
            </Combobox>
        );
    },
);

export default InputDropdown;
