import React, {
    ChangeEvent,
    forwardRef,
    useEffect,
    useRef,
    ComponentProps,
    useState,
} from "react";
import clsx from "clsx";
import "./date-picker.scss";
import Input, { InputProps } from "../base";
import { DatePicker, DatePickerProps } from "@components/Atom";
import { reactNodeToString } from "@utils/common-utils";
import dayjs from "dayjs";
import { useDropdown } from "@hooks/useDropdown";
import useBreakpoints from "@hooks/useBreakpoints";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { StandaloneCalendarRegularIcon } from "@deriv/quill-icons";
import { DropdownProvider } from "@providers/dropdown/dropdownProvider";
import ActionSheet from "@components/ActionSheet";

dayjs.extend(customParseFormat);

export interface TDatePickerDropdownProps extends Omit<InputProps, "leftIcon"> {
    onSearch?: (inputValue: string) => void;
    onSelectDate: (value: Date) => void;
    isAutocomplete?: boolean;
    datePickerProps?: DatePickerProps;
    value?: string;
    fullHeightOnOpen?: boolean;
    actionSheetFooter?: ComponentProps<typeof ActionSheet.Footer>;
}

const dateFormat = "DD/MM/YYYY";

const DatePickerInput = forwardRef<HTMLInputElement, TDatePickerDropdownProps>(
    (
        {
            label,
            textAlignment = "left",
            inputSize = "lg",
            status = "neutral",
            isAutocomplete = false,
            fullHeightOnOpen = true,
            className,
            actionSheetFooter,
            datePickerProps = { selectRange: false },
            onSelectDate,
            onSearch,
            disabled,
            value,
            ...rest
        },
        ref,
    ) => {
        const [date, setDate] = useState<string>();
        const inputRef = useRef<HTMLInputElement>(null);
        const dropdownRef = useRef<HTMLInputElement>(null);
        const actionSheetRef = useRef<HTMLDivElement>(null);
        const { isOpen, open, close } = useDropdown([
            dropdownRef,
            actionSheetRef,
        ]);
        const { isMobile } = useBreakpoints();

        const {
            selectRange,
            className: datePickerClassName,
            ...restDatePickerProps
        } = datePickerProps;

        useEffect(() => {
            setDate(value);
        }, [value]);

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
                <div
                    onClick={handleDropdown}
                    ref={ref}
                    data-testid="input-container"
                >
                    <Input
                        leftIcon={
                            <StandaloneCalendarRegularIcon
                                iconSize="sm"
                                fill="var(--semantic-color-monochrome-textIcon-normal-high)"
                            />
                        }
                        ref={inputRef}
                        data-testid="calendar-input"
                        label={convertedLabel}
                        dropdown
                        disabled={disabled}
                        textAlignment={textAlignment}
                        inputSize={inputSize}
                        status={status}
                        isDropdownOpen={isOpen}
                        readOnly={!isAutocomplete}
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
                        `datepicker-dropdown__menu--${textAlignment}`,
                    )}
                >
                    {!isMobile ? (
                        isOpen && (
                            <DatePicker
                                data-testid="calendar"
                                value={date && dayjs(date, dateFormat).toDate()}
                                hasFixedWidth
                                onFormattedDate={(value) => {
                                    setDate(value);
                                    onSelectDate?.(
                                        dayjs(value, dateFormat).toDate(),
                                    );
                                }}
                                onChange={(value) => {
                                    onSelectDate?.(value as Date);
                                    close();
                                }}
                                className={clsx(
                                    "datepicker__container",
                                    datePickerClassName,
                                )}
                                selectRange={selectRange}
                                {...restDatePickerProps}
                            />
                        )
                    ) : (
                        <ActionSheet.Root
                            isOpen={isOpen}
                            onClose={() => close()}
                        >
                            <ActionSheet.Portal
                                shouldCloseOnDrag={true}
                                fullHeightOnOpen={fullHeightOnOpen}
                                ref={actionSheetRef}
                            >
                                {label && <ActionSheet.Header title={label} />}
                                <ActionSheet.Content>
                                    <DatePicker
                                        data-testid="calendar"
                                        value={
                                            date &&
                                            dayjs(date, dateFormat).toDate()
                                        }
                                        hasFixedWidth
                                        onFormattedDate={(value) => {
                                            setDate(value);
                                            onSelectDate?.(
                                                dayjs(
                                                    value,
                                                    dateFormat,
                                                ).toDate(),
                                            );
                                        }}
                                        onChange={(value) => {
                                            onSelectDate?.(value as Date);
                                            close();
                                        }}
                                        className={clsx(
                                            "datepicker__container",
                                            datePickerClassName,
                                        )}
                                        selectRange={selectRange}
                                        {...restDatePickerProps}
                                    />
                                </ActionSheet.Content>
                                <ActionSheet.Footer {...actionSheetFooter} />
                            </ActionSheet.Portal>
                        </ActionSheet.Root>
                    )}
                </div>
            </div>
        );
    },
);

export const DatePickerDropdown = forwardRef<
    HTMLInputElement,
    TDatePickerDropdownProps
>(({ ...rest }, ref) => {
    return (
        <DropdownProvider>
            <DatePickerInput ref={ref} {...rest} />
        </DropdownProvider>
    );
});

export default DatePickerDropdown;
