import { useEffect } from "react";
import clsx from "clsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./date-picker.scss";
import {
    LabelPairedChevronRightSmFillIcon,
    LabelPairedChevronLeftSmFillIcon,
} from "@deriv/quill-icons";
import { Text } from "@components/Typography";

export interface DatePickerProps
    extends Omit<
        React.ComponentProps<typeof Calendar>,
        | "onChange"
        | "activeStartDate"
        | "maxDetail"
        | "minDetail"
        | "defaultView"
    > {
    hasFixedWidth?: boolean;
    optionsConfig?: Record<string, string>;
    onChange?: (
        value: Value,
        event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => void;
    onFormattedDate?: (value: string) => void;
    startDate?: Date;
    wrapperClassName?: string;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const DatePicker = ({
    startDate,
    allowPartialRange = false,
    calendarType,
    className,
    defaultValue,
    hasFixedWidth = true,
    formatMonthYear = (locale, date) =>
        new Date(date).toLocaleString(locale || navigator.languages, {
            month: "short",
            year: "numeric",
        }),
    goToRangeStartOnSelect = true,
    locale,
    navigationLabel = ({ label }) => <Text as="span">{label}</Text>,
    next2Label = null,
    nextLabel = (
        <LabelPairedChevronRightSmFillIcon fill="var(--component-textIcon-normal-prominent)" />
    ),
    optionsConfig = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    },
    onChange,
    onFormattedDate,
    prev2Label = null,
    prevLabel = (
        <LabelPairedChevronLeftSmFillIcon fill="var(--component-textIcon-normal-prominent)" />
    ),
    returnValue = "start",
    selectRange = false,
    showNavigation = true,
    showNeighboringMonth = false,
    tileClassName,
    value,
    wrapperClassName,
    ...rest
}: DatePickerProps) => {
    const formatLocaleString = (date: Date) =>
        date.toLocaleString(locale || navigator.language, optionsConfig);

    const formatSelectedDate = (date: Value) => {
        if (!date) return "";
        if (Array.isArray(date)) {
            return date
                .map((item) => (item ? formatLocaleString(item) : ""))
                .join(" - ");
        }
        return formatLocaleString(date);
    };

    useEffect(() => {
        if (value) onFormattedDate?.(formatSelectedDate(value as Value));
        if (defaultValue)
            onFormattedDate?.(formatSelectedDate(defaultValue as Value));
    }, [value, defaultValue]);

    return (
        <div
            className={clsx(
                "quill-date-picker__wrapper",
                { "quill-date-picker__wrapper--fixed-width": hasFixedWidth },
                wrapperClassName,
            )}
            data-testid="atom-calendar"
        >
            <Calendar
                {...rest}
                activeStartDate={startDate}
                allowPartialRange={allowPartialRange}
                calendarType={calendarType}
                className={clsx("quill-date-picker", className)}
                defaultValue={defaultValue}
                formatMonthYear={formatMonthYear}
                goToRangeStartOnSelect={goToRangeStartOnSelect}
                locale={locale}
                navigationLabel={navigationLabel}
                next2Label={next2Label}
                nextLabel={nextLabel}
                onChange={(value, event) => {
                    onChange?.(value, event);
                    onFormattedDate?.(formatSelectedDate(value));
                }}
                prev2Label={prev2Label}
                prevLabel={prevLabel}
                returnValue={returnValue}
                selectRange={selectRange}
                showNavigation={showNavigation}
                showNeighboringMonth={showNeighboringMonth}
                tileClassName={tileClassName}
                value={value}
            />
        </div>
    );
};

export default DatePicker;
