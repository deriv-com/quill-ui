import { useState } from "react";
import clsx from "clsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./date-picker.scss";
import {
    LabelPairedChevronRightSmFillIcon,
    LabelPairedChevronLeftSmFillIcon,
} from "@deriv/quill-icons";
import { Text } from "@components/Typography";

export interface DatePicker extends React.ComponentProps<typeof Calendar> {
    optionsConfig?: Record<string, string>;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const DatePicker = ({
    activeStartDate,
    allowPartialRange = false,
    calendarType,
    className,
    defaultActiveStartDate,
    defaultValue,
    defaultView,
    formatDay,
    formatLongDate,
    formatMonth,
    formatMonthYear = (locale, date) =>
        new Date(date).toLocaleString(locale || navigator.languages, {
            month: "short",
            year: "numeric",
        }),
    formatShortWeekday,
    formatWeekday,
    formatYear,
    goToRangeStartOnSelect = true,
    inputRef,
    locale,
    maxDate,
    maxDetail = "month",
    minDate,
    minDetail = "century",
    navigationAriaLabel,
    navigationAriaLive,
    navigationLabel = ({ label }) => <Text as="span">{label}</Text>,
    next2AriaLabel,
    next2Label = null,
    nextAriaLabel,
    nextLabel = (
        <LabelPairedChevronRightSmFillIcon fill="var(--component-textIcon-normal-prominent)" />
    ),
    optionsConfig = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    },
    onActiveStartDateChange,
    prev2AriaLabel,
    prev2Label = null,
    prevAriaLabel,
    prevLabel = (
        <LabelPairedChevronLeftSmFillIcon fill="var(--component-textIcon-normal-prominent)" />
    ),
    returnValue = "start",
    selectRange = false,
    showNavigation = true,
    showNeighboringMonth = false,
    tileClassName,
}: DatePicker) => {
    const [date, setDate] = useState<Value>(new Date());

    const formatLocaleString = (
        date: Date,
        config: Record<string, string>,
        locale?: string | string[],
    ) => date.toLocaleString(locale, config);

    const formatSelectedDate = (date: Value) => {
        if (!date) return null;
        if (Array.isArray(date)) {
            return date
                .map((item) =>
                    item
                        ? formatLocaleString(
                              item,
                              optionsConfig,
                              locale || navigator.language,
                          )
                        : "",
                )
                .join(" - ");
        }
        return formatLocaleString(
            date,
            optionsConfig,
            locale || navigator.language,
        );
    };
    // TODO: add input with ability to enabling user typing
    // TODO: add normal wrapper for Calendar

    return (
        <>
            <div>{formatSelectedDate(date)}</div>
            <div style={{ width: "368px" }}>
                <Calendar
                    activeStartDate={activeStartDate}
                    allowPartialRange={allowPartialRange}
                    calendarType={calendarType}
                    className={clsx("quill-date-picker", className)}
                    defaultActiveStartDate={defaultActiveStartDate}
                    defaultValue={defaultValue}
                    defaultView={defaultView}
                    formatDay={formatDay}
                    formatLongDate={formatLongDate}
                    formatMonth={formatMonth}
                    formatMonthYear={formatMonthYear}
                    formatShortWeekday={formatShortWeekday}
                    formatWeekday={formatWeekday}
                    formatYear={formatYear}
                    goToRangeStartOnSelect={goToRangeStartOnSelect}
                    inputRef={inputRef}
                    locale={locale}
                    maxDate={maxDate}
                    maxDetail={maxDetail}
                    minDate={minDate}
                    minDetail={minDetail}
                    navigationAriaLabel={navigationAriaLabel}
                    navigationAriaLive={navigationAriaLive}
                    navigationLabel={navigationLabel}
                    next2AriaLabel={next2AriaLabel}
                    next2Label={next2Label}
                    nextAriaLabel={nextAriaLabel}
                    nextLabel={nextLabel}
                    onActiveStartDateChange={onActiveStartDateChange}
                    onChange={(value) => setDate(value)}
                    prev2AriaLabel={prev2AriaLabel}
                    prev2Label={prev2Label}
                    prevAriaLabel={prevAriaLabel}
                    prevLabel={prevLabel}
                    returnValue={returnValue}
                    selectRange={selectRange}
                    showNavigation={showNavigation}
                    showNeighboringMonth={showNeighboringMonth}
                    tileClassName={tileClassName}
                    value={date}
                />
            </div>
        </>
    );
};
