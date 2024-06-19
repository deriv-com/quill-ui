import React, { forwardRef, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { useCombobox } from "downshift";
import "./date-picker.scss";
import Input, { InputProps } from "../base";
import { DatePicker } from "@components/Atom";
import { reactNodeToString } from "@utils/common-utils";
import { Text } from "@components/Typography";

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
}

export const DropdownDatePicker = forwardRef<HTMLInputElement, TDropdownProps>(
    (
        {
            disabled,
            label,
            options,
            textAlignment = "left",
            inputSize = "md",
            status = "neutral",
            name,
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
        const [isAnimating, setIsAnimating] = useState(false);
        const [formattedDate, setFormattedDate] = useState("");

        const clearFilter = useCallback(() => {
            setShouldFilterList(false);
            setItems(options);
        }, [options]);

        const {
            closeMenu,
            getInputProps,
            getMenuProps,
            getToggleButtonProps,
            isOpen,
            openMenu,
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
        }, [options]);

        return (
            <div
                className="datepicker__wrapper"
                style={isOpen ? { zIndex: "999" } : {}}
            >
                <div {...getToggleButtonProps()}>
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
                </div>
                <div
                    {...getMenuProps()}
                    className={clsx(
                        "datepicker-dropdown__menu",
                        isOpen
                            ? "datepicker-dropdown__menu--open"
                            : "datepicker-dropdown__menu--close",
                    )}
                >
                    {isOpen && (
                        <div>
                            <DatePicker
                                goToRangeStartOnSelect
                                hasFixedWidth
                                formatMonthYear={(locale, date) =>
                                    new Date(date).toLocaleString(
                                        locale || navigator.languages,
                                        {
                                            month: "short",
                                            year: "numeric",
                                        },
                                    )
                                }
                                next2Label={null}
                                navigationLabel={({ label }) => (
                                    <Text as="span">{label}</Text>
                                )}
                                // nextLabel={
                                //     <LabelPairedChevronRightSmFillIcon fill="var(--component-textIcon-normal-prominent)" />
                                // }
                                // prevLabel={
                                //     <LabelPairedChevronLeftSmFillIcon fill="var(--component-textIcon-normal-prominent)" />
                                // }
                                onActiveStartDateChange={() => {}}
                                onChange={() => {}}
                                onFormattedDate={(value) =>
                                    setFormattedDate(value)
                                }
                                optionsConfig={{
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                }}
                                prev2Label={null}
                                returnValue="start"
                                showNavigation
                                className="datepicker__container"
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    },
);

export default DropdownDatePicker;
