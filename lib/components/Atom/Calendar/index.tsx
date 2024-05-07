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

// TODO: rewrite interface after adding input
// export interface DatePicker extends React.ComponentProps<typeof Calendar> {
//     ...
// }

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
}: React.ComponentProps<typeof Calendar>) => {
    const [date, setDate] = useState<Value>(new Date());

    // TODO: add input with ability to enabling user typing
    // TODO: add normal wrapper for Calendar

    return (
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
                onChange={setDate}
                value={date}
                next2Label={null}
                prev2Label={null}
                nextLabel={<LabelPairedChevronRightSmFillIcon />}
                prevLabel={<LabelPairedChevronLeftSmFillIcon />}
                showNeighboringMonth={false}
            />
        </div>
    );
};
