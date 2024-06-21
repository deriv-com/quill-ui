import React, {
    ChangeEvent,
    forwardRef,
    useEffect,
    useRef,
    useState,
} from "react";
import clsx from "clsx";
import "./date-picker.scss";
import Input, { InputProps } from "../base";
import { DatePicker } from "@components/Atom";
import { reactNodeToString } from "@utils/common-utils";
import dayjs from "dayjs";
import useDropdown from "@hooks/useDropdown";
import customParseFormat from "dayjs/plugin/customParseFormat";

// Extend dayjs with customParseFormat plugin
dayjs.extend(customParseFormat);

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

const dateFormat = "DD/MM/YYYY";

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
        const { ref: dropdownRef, isOpen, open, close } = useDropdown();
        const handleDropdown = () => {
            isOpen ? close() : open();
        };

        const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
            const input = e.target.value;

            // Validate the formatted input using dayjs
            if (dayjs(input, dateFormat, true).isValid()) {
                // date && dayjs(date).format("DD/MM/YYYY");
                const formattedInput = dayjs(input, dateFormat);
                console.log(formattedInput);
                setDate(formattedInput);
            }
        };

        return (
            <div
                className="datepicker__wrapper"
                style={isOpen ? { zIndex: "999" } : {}}
                ref={dropdownRef}
            >
                <div onClick={handleDropdown}>
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
                        readOnly={!isAutocomplete}
                        type="select"
                        value={date && dayjs(date).format("DD/MM/YYYY")}
                        onChange={handleOnchange}
                        onKeyDown={}
                        maxLength={10}
                        {...rest}
                    />
                </div>

                <div
                    className={clsx(
                        "datepicker-dropdown__menu",
                        isOpen
                            ? "datepicker-dropdown__menu--open"
                            : "datepicker-dropdown__menu--close",
                    )}
                >
                    {isOpen && (
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
                            onChange={(value) => {
                                setDate(value as Date);
                                close();
                            }}
                            optionsConfig={{
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            }}
                            returnValue="start"
                            showNavigation
                            className="datepicker__container"
                        />
                    )}
                </div>
            </div>
        );
    },
);

export default DropdownDatePicker;
