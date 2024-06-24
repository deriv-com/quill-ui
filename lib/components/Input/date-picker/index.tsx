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
import { DatePicker, DatePickerProps } from "@components/Atom";
import { reactNodeToString } from "@utils/common-utils";
import dayjs from "dayjs";
import useDropdown from "@hooks/useDropdown";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { StandaloneCalendarRegularIcon } from "@deriv/quill-icons";

dayjs.extend(customParseFormat);

export interface TDatePickerDropdownProps extends Omit<InputProps, "leftIcon"> {
    onSearch?: (inputValue: string) => void;
    onSelectDate: (value: Date) => void;
    isAutocomplete?: boolean;
    datePickerProps?: DatePickerProps;
}

const dateFormat = "DD/MM/YYYY";

export const DatePickerDropdown = forwardRef<
    HTMLInputElement,
    TDatePickerDropdownProps
>(
    (
        {
            label,
            textAlignment = "left",
            inputSize = "md",
            status = "neutral",
            isAutocomplete = false,
            className,
            datePickerProps = { selectRange: false },
            onSelectDate,
            onSearch,
            disabled,
            ...rest
        },
        ref,
    ) => {
        const [date, setDate] = useState<string | undefined>();
        const inputRef = useRef<HTMLInputElement>(null);
        const { ref: dropdownRef, isOpen, open, close } = useDropdown();
        const handleDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
            if (
                isAutocomplete &&
                isOpen &&
                inputRef.current?.contains(e.target as Node)
            )
                return;
            isOpen ? close() : open();
        };

        const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
            const input = e.target.value;
            onSearch?.(input);

            if (dayjs(input, dateFormat, true).isValid() || input === "")
                setDate(input);
        };

        const convertedLabel = reactNodeToString(label);

        useEffect(() => {
            if (isOpen) inputRef.current?.focus();
            if (!date) return;
            if (!inputRef.current) return;
            if (dayjs(inputRef.current.value, dateFormat, true).isValid())
                return;

            inputRef.current.value = date;
        }, [isOpen]);

        return (
            <div
                className={clsx(
                    "datepicker__wrapper",
                    isOpen && "datepicker__wrapper--open",
                    disabled && "datepicker__wrapper--disabled",
                )}
                ref={dropdownRef}
            >
                <div onClick={handleDropdown} ref={ref}>
                    <Input
                        leftIcon={
                            <StandaloneCalendarRegularIcon
                                iconSize="sm"
                                fill="var(--semantic-color-monochrome-textIcon-normal-high)"
                            />
                        }
                        ref={inputRef}
                        data-testid="dropdown-input"
                        label={convertedLabel}
                        dropdown
                        disabled={disabled}
                        textAlignment={textAlignment}
                        inputSize={inputSize}
                        status={status}
                        isDropdownOpen={isOpen}
                        readOnly={!isAutocomplete}
                        type="tel"
                        value={date}
                        className={clsx("datepicker__input", className)}
                        onChange={handleOnChange}
                        formatProps={{
                            format: "##/##/####",
                            mask: "_",
                        }}
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
                            value={date && dayjs(date, dateFormat).toDate()}
                            hasFixedWidth
                            onFormattedDate={(value) => {
                                setDate(value);
                            }}
                            onChange={(value) => {
                                onSelectDate?.(value as Date);
                                close();
                            }}
                            className={clsx(
                                "datepicker__container",
                                datePickerProps?.className,
                            )}
                            selectRange
                            {...datePickerProps}
                        />
                    )}
                </div>
            </div>
        );
    },
);

export default DatePickerDropdown;
