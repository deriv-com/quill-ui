import { useState } from "react";
// import clsx from "clsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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
}: React.ComponentProps<typeof Calendar>) => {
    const [date, setDate] = useState<Value>(new Date());
    console.log("test activeStartDate", activeStartDate);
    return (
        <div>
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
            />
            <button
                onClick={() => {
                    setDate(new Date());
                }}
            >
                Set current Date
            </button>
        </div>
    );
};
