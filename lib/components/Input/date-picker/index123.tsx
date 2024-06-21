import React, { forwardRef, useCallback, useState } from "react";
import clsx from "clsx";
import { useCombobox } from "downshift";
import "./date-picker.scss";
import Input, { InputProps } from "../base";
import { DatePicker } from "@components/Atom";
import { reactNodeToString } from "@utils/common-utils";
import dayjs from "dayjs";

export type TOptionList = {
    text?: React.ReactNode;
    value?: string;
};

export interface TDropdownProps extends InputProps {
    onSearch?: (inputValue: string) => void;
    onSelectOption: (value: string) => void;
    isAutocomplete?: boolean;
    listHeight?: string;
}

export const DropdownDatePicker = forwardRef<HTMLInputElement, TDropdownProps>(
    (
        {
            disabled,
            label,
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
        const [date, setDate] = useState<Date | undefined>();

        const {
            closeMenu,
            getInputProps,
            getMenuProps,
            getToggleButtonProps,
            isOpen,
            openMenu,
            selectItem,
        } = useCombobox({
            defaultSelectedItem: date ?? dayjs(date).format("DD/MM/YYYY"),
            items: [],
            onInputValueChange({ inputValue }) {
                inputValue && selectItem(inputValue);
            },
        });

        const handleInputClick = useCallback(() => {
            isOpen ? closeMenu() : openMenu();
        }, [closeMenu, isOpen, openMenu, isAutocomplete]);

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
                                value={date}
                                onActiveStartDateChange={() => {}}
                                onChange={(value) => {
                                    setDate(value as Date);
                                    selectItem(
                                        dayjs(value as Date).format(
                                            "DD/MM/YYYY",
                                        ),
                                    );
                                    closeMenu();
                                }}
                                onFormattedDate={(value) =>
                                    dayjs(value).format("DD/MM/YYYY")
                                }
                                optionsConfig={{
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                }}
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
