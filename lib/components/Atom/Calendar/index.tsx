import { useState } from "react";
// import clsx from "clsx";
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
    className = "quill-checkbox__date-picker",
    defaultActiveStartDate,
}: React.ComponentProps<typeof Calendar>) => {
    const [date, setDate] = useState<Value>(new Date());
    console.log("test activeStartDate", activeStartDate);
    return (
        <div style={{ width: "368px" }}>
            <Calendar
                activeStartDate={
                    typeof activeStartDate === "number"
                        ? new Date(activeStartDate)
                        : activeStartDate
                }
                allowPartialRange={allowPartialRange}
                calendarType={calendarType}
                className={className}
                defaultActiveStartDate={defaultActiveStartDate}
                onChange={setDate}
                value={date}
                next2Label={null}
                prev2Label={null}
                nextLabel={<LabelPairedChevronRightSmFillIcon />}
                prevLabel={<LabelPairedChevronLeftSmFillIcon />}
                showNeighboringMonth={false}
                // view={"century"}
            />
        </div>
    );
};
