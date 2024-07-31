import React, {
    ChangeEvent,
    forwardRef,
    useEffect,
    useRef,
    useState,
} from "react";
import clsx from "clsx";
import "./date-picker.scss";
import { InputProps } from "../base";
import { DatePicker, DatePickerProps } from "@components/Atom";
import dayjs from "dayjs";
import { useDropdown } from "@hooks/useDropdown";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CustomDropdown } from "../custom-dropdown";

dayjs.extend(customParseFormat);

export interface TDatePickerDropdownProps extends Omit<InputProps, "leftIcon"> {
    onSearch?: (inputValue: string) => void;
    onSelectDate: (value: Date) => void;
    isAutocomplete?: boolean;
    datePickerProps?: DatePickerProps;
    value?: string;
}

const dateFormat = "DD/MM/YYYY";

const DatePickerInput = forwardRef<HTMLInputElement, TDatePickerDropdownProps>(
    (
        {
            datePickerProps = { selectRange: false },
            onSelectDate,
            onSearch,
            value,
        },
        ref,
    ) => {
        const [date, setDate] = useState<string>();
        const inputRef = useRef<HTMLInputElement>(null);
        const dropdownRef = useRef<HTMLInputElement>(null);
        const { selectedValue, close, setSelectedValue } =
            useDropdown(dropdownRef);
        const {
            selectRange,
            className: datePickerClassName,
            ...restDatePickerProps
        } = datePickerProps;

        useEffect(() => {
            setDate(value);
        }, [value]);

        const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
            const input = e.target.value;
            onSearch?.(input);

            if (dayjs(input, dateFormat, true).isValid() || input === "")
                setDate(input);
        };

        // useEffect(() => {
        //     if (isOpen) inputRef.current?.focus();
        //     if (!date) return;
        //     if (!inputRef.current) return;
        //     if (dayjs(inputRef.current.value, dateFormat, true).isValid())
        //         return;

        //     inputRef.current.value = date;
        // }, [isOpen]);

        return (
            <DatePicker
                data-testid="calendar"
                value={date && dayjs(selectedValue, dateFormat).toDate()}
                hasFixedWidth={false}
                onFormattedDate={(value) => {
                    setSelectedValue(value);
                    onSelectDate?.(dayjs(value, dateFormat).toDate());
                }}
                onChange={(value) => {
                    onSelectDate?.(value as Date);
                    close();
                }}
                className={clsx("datepicker__container", datePickerClassName)}
                selectRange={selectRange}
                {...restDatePickerProps}
            />
        );
    },
);

export const DatePickerDropdown = forwardRef<
    HTMLInputElement,
    TDatePickerDropdownProps
>(({ ...rest }, ref) => {
    return (
        <CustomDropdown
            data-testid="calendar-input"
            dropdown
            formatProps={{
                format: "##/##/####",
                mask: "_",
            }}
            actionSheetFooter={{
                primaryAction: { content: "Done", onAction: () => null },
                secondaryAction: { content: "Cancel", onAction: () => null },
                alignment: "horizontal",
            }}
            {...rest}
        >
            <DatePickerInput ref={ref} {...rest} />
        </CustomDropdown>
    );
});

export default DatePickerDropdown;
