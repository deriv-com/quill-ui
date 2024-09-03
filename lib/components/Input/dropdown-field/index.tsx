import React, { forwardRef, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { useCombobox } from "downshift";
import "./dropdown.scss";
import Input, { InputProps } from "../base";
import { DropdownItem } from "@components/Atom";
import { reactNodeToString } from "@utils/common-utils";

export type TOptionList = {
    text?: React.ReactNode;
    value?: string;
};

export interface TDropdownProps extends InputProps {
    onSearch?: (inputValue: string) => void;
    onSelectOption: (value: string) => void;
    isAutocomplete?: boolean;
    options: TOptionList[];
    listHeight?: string;
    wrapperClassName?: string;
}

export const InputDropdown = forwardRef<HTMLInputElement, TDropdownProps>(
    (
        {
            disabled,
            label,
            options,
            textAlignment = "left",
            inputSize = "lg",
            status = "neutral",
            name,
            wrapperClassName,
            listHeight,
            onSearch,
            onSelectOption,
            value,
            isAutocomplete = false,
            ...rest
        },
        ref,
    ) => {
        const [items, setItems] = useState<TOptionList[]>(options);
        const [shouldFilterList, setShouldFilterList] = useState(false);
        const [selectedItem, setSelectedItem] = useState<TOptionList | null>(
            null,
        );
        const [isAnimating, setIsAnimating] = useState(false);

        const clearFilter = useCallback(() => {
            setShouldFilterList(false);
            setItems(options);
        }, [options]);

        const {
            closeMenu,
            getInputProps,
            getItemProps,
            getMenuProps,
            getToggleButtonProps,
            isOpen,
            openMenu,
            highlightedIndex,
        } = useCombobox({
            defaultSelectedItem:
                options.find((item) => item.value === value) ?? null,
            items,
            itemToString(item) {
                return item ? reactNodeToString(item.text) : "";
            },
            onInputValueChange({ inputValue }) {
                onSearch?.(inputValue ?? "");
                if (isAutocomplete || shouldFilterList) {
                    setItems(
                        options.filter((item) =>
                            reactNodeToString(item.text)
                                .toLowerCase()
                                .includes(inputValue?.toLowerCase() ?? ""),
                        ),
                    );
                }
            },
            onIsOpenChange({ isOpen }) {
                setIsAnimating(true);
                setTimeout(() => {
                    clearFilter();
                    setIsAnimating(false);
                }, 100);
                if (!isOpen) {
                    clearFilter();
                }
            },
            onSelectedItemChange({ selectedItem }) {
                onSelectOption(selectedItem?.value ?? "");
                setSelectedItem(selectedItem ?? null);
                closeMenu();
            },
        });

        const handleInputClick = useCallback(() => {
            if (isAutocomplete) setShouldFilterList(true);

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }, [closeMenu, isOpen, openMenu, isAutocomplete]);

        useEffect(() => {
            setItems(options);
            if (value) {
                const defaultItem = options.find(
                    (option) => option.value === value,
                );
                defaultItem && setSelectedItem(defaultItem);
            }
        }, [options]);

        return (
            <div
                className={clsx("dropdown__wrapper", wrapperClassName)}
                {...getToggleButtonProps()}
            >
                <Input
                    ref={ref}
                    data-testid="dropdown-input"
                    disabled={disabled}
                    label={reactNodeToString(label)}
                    name={name}
                    dropdown
                    textAlignment={textAlignment}
                    inputSize={inputSize}
                    status={status}
                    isDropdownOpen={isOpen}
                    onClickCapture={handleInputClick}
                    onKeyUp={() => setShouldFilterList(true)}
                    onKeyDown={() => setShouldFilterList(true)}
                    readOnly={!isAutocomplete}
                    type="select"
                    value={value}
                    {...getInputProps()}
                    {...rest}
                />
                <ul
                    {...getMenuProps()}
                    className={clsx("deriv-dropdown__menu", {
                        "deriv-dropdown__menu--open": isOpen && !isAnimating,
                        "deriv-dropdown__menu--close": !isOpen && isAnimating,
                    })}
                >
                    {isOpen && items.length > 0 && (
                        <div
                            className={clsx(
                                "dropdown__container",
                                listHeight
                                    ? listHeight
                                    : `dropdown__container--height`,
                                `dropdown__container--size-${inputSize}`,
                            )}
                        >
                            {items.map((item, index) => (
                                <DropdownItem
                                    className={clsx(
                                        highlightedIndex === index &&
                                            selectedItem?.value !==
                                                item.value &&
                                            "dropdown__item--active",
                                    )}
                                    key={item.value}
                                    onClick={() => clearFilter()}
                                    label={item.text}
                                    selected={
                                        selectedItem?.value === item.value
                                    }
                                    size={inputSize}
                                    textAlignment={textAlignment}
                                    {...getItemProps({ index, item })}
                                />
                            ))}
                        </div>
                    )}
                </ul>
            </div>
        );
    },
);

export default InputDropdown;
