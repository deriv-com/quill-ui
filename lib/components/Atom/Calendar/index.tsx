import { useState } from "react";
import clsx from "clsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./date-picker.scss";
import {
    LabelPairedChevronRightSmFillIcon,
    LabelPairedChevronLeftSmFillIcon,
} from "@deriv/quill-icons";
// import { Text } from "@components/Typography";

// export interface DatePicker {
//     activeStartDate?: Date;
//     className?: string;
//     calendarType?: "gregory" | "hebrew" | "islamic" | "iso8601";
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
    formatMonthYear,
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
}: React.ComponentProps<typeof Calendar>) => {
    const [date, setDate] = useState<Value>(new Date());
    // console.log(
    //     "test  typeof new Date(2017, 0, 1)",
    //     typeof new Date(2017, 0, 1),
    //     typeof new Date(),
    // );
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
