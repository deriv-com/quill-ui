import clsx from "clsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./date-picker.scss";
import {
    LabelPairedChevronRightSmFillIcon,
    LabelPairedChevronLeftSmFillIcon,
} from "@deriv/quill-icons";
import { Text } from "@components/Typography";

interface DatePicker
    extends Omit<React.ComponentProps<typeof Calendar>, "onChange"> {
    optionsConfig?: Record<string, string>;
    onChange?: (
        value: Value,
        event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => void;
    onFormattedDate?: (value: string) => void;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const DatePicker = ({
    activeStartDate,
    allowPartialRange = false,
    calendarType,
    className,
    defaultValue,
    defaultView,
    formatMonthYear = (locale, date) =>
        new Date(date).toLocaleString(locale || navigator.languages, {
            month: "short",
            year: "numeric",
        }),
    goToRangeStartOnSelect = true,
    locale,
    maxDetail = "month",
    minDetail = "century",
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
    ...rest
}: DatePicker) => {
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

    // TODO: add input with ability to enabling user typing
    // TODO: add normal wrapper for Calendar

    return (
        <div style={{ width: "368px" }}>
            <Calendar
                {...rest}
                activeStartDate={activeStartDate}
                allowPartialRange={allowPartialRange}
                calendarType={calendarType}
                className={clsx("quill-date-picker", className)}
                defaultValue={defaultValue}
                defaultView={defaultView}
                formatMonthYear={formatMonthYear}
                goToRangeStartOnSelect={goToRangeStartOnSelect}
                locale={locale}
                maxDetail={maxDetail}
                minDetail={minDetail}
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
