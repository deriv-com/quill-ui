import React, {
    KeyboardEvent,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";
import WheelPicker from "../base";
import { KEY } from "@utils/common-utils";
import { TimeWheelPickerContainerProps } from "../types";
import dayjs from "dayjs";
import { debounce } from "lodash";

export const TimeWheelPickerContainer = ({
    is12Hour = true,
    startTimeIn24Format,
    endTimeIn24Format = "23:59",
    selectedTime = "0:00",
    minutesInterval = 2,
    hoursInterval = 1,
    locale = "en-US",
    setSelectedValue,
    setSelectedTime,
    close,
    data,
    disabled,
}: TimeWheelPickerContainerProps) => {
    const inputStartDate = dayjs(`1/1/1 ${startTimeIn24Format ?? "00:00"}`);
    const inputSelectedDate = dayjs(`1/1/1 ${selectedTime}`);
    const inputEndDate = dayjs(`1/1/1 ${endTimeIn24Format}`);
    const [hourValue, setHourValue] = useState<{
        label?: string | ReactNode;
        value: string | number;
    }>({
        label: "00",
        value: 0,
    });
    const [minuteValue, setMinuteValue] = useState<{
        label?: string | ReactNode;
        value: string | number;
    }>({
        label: "00",
        value: 0,
    });
    const [meridiemValue, setMeridiemValue] = useState<{
        label?: string | ReactNode;
        value: string | number;
    }>({
        label: "AM",
        value: "AM",
    });

    const [colRef, setColRef] = useState<boolean[]>(
        new Array(is12Hour ? 3 : 2).fill(false),
    );

    const [minutes, setMinutes] = useState<
        {
            label?: string | ReactNode;
            value: string | number;
        }[]
    >();
    const [hours, setHours] = useState<
        {
            label?: string | ReactNode;
            value: string | number;
        }[]
    >();
    const [meridiem, setMeridiem] = useState<
        {
            label?: string | ReactNode;
            value: string | number;
        }[]
    >();

    const getHoursArray = () => {
        const hoursData = [];
        if (is12Hour) {
            for (let i = 1; i <= 12; i += hoursInterval) {
                hoursData.push({
                    label: `0${i}`.slice(-2),
                    value: i,
                });
            }
        } else {
            for (
                let i = inputStartDate.get("hour");
                i <= (inputEndDate.get("hour") || 23);
                i += hoursInterval
            ) {
                hoursData.push({
                    label: `0${i}`.slice(-2),
                    value: i,
                });
            }
        }
        return hoursData;
    };

    const getLocalizedMeridiem = (meridiem: string) => {
        const date = new Date(`1/1/1 12:00:00 ${meridiem}`);
        const options: Intl.DateTimeFormatOptions = {
            hour12: true,
            timeStyle: "long",
        };

        const formatter = new Intl.DateTimeFormat(locale, options);
        const ampm = formatter
            .formatToParts(date)
            .find((part) => part.type === "dayPeriod")?.value;

        return ampm ? ampm.toUpperCase() : "";
    };

    const setMinutesArray = useCallback(
        debounce(
            (
                minutesData: {
                    label: string | ReactNode;
                    value: string | number;
                }[],
            ) => {
                setMinutes([...minutesData]);
            },
            100,
        ),
        [],
    );

    useEffect(() => {
        const hour = inputSelectedDate.get("hour");
        if (is12Hour) {
            setHourValue({
                label: `0${hour % 12 || 12}`.slice(-2),
                value: hour % 12 || 12,
            });

            const meridiemData = [];
            const meridiem = inputSelectedDate.format("A");

            meridiemData.push({
                label: getLocalizedMeridiem("AM"),
                value: "AM",
            });
            meridiemData.push({
                label: getLocalizedMeridiem("PM"),
                value: "PM",
            });

            setMeridiem(meridiemData);
            setMeridiemValue({
                label: getLocalizedMeridiem(meridiem),
                value: meridiem,
            });
        } else {
            setHourValue({ label: `0${hour}`.slice(-2), value: hour });
        }
        const hoursData = getHoursArray();
        setHours(hoursData);

        setMinuteValue({
            label:
                minuteValue.label ||
                `0${inputSelectedDate.get("minute")}`.slice(-2),
            value: minuteValue.value || inputSelectedDate.get("minute"),
        });

        const minutesData = [];
        for (let i = 0; i < 60; i += minutesInterval) {
            minutesData.push({
                label: `0${i}`.slice(-2),
                value: i,
            });
        }
        setMinutes([...minutesData]);
    }, []);

    useEffect(() => {
        if (!is12Hour && startTimeIn24Format) {
            const minutesData = [];

            let startMinute = 0;
            if (inputStartDate.get("hour") === hourValue.value) {
                startMinute =
                    inputStartDate.get("minute") +
                    (inputStartDate.get("minute") % minutesInterval
                        ? minutesInterval -
                          (inputStartDate.get("minute") % minutesInterval)
                        : 0);
                if (startMinute === 60) {
                    setHourValue({
                        label: `0${hourValue.value + 1}`.slice(-2),
                        value: hourValue.value + 1,
                    });
                    setHours(
                        hours?.filter((hour) => hour.value > hourValue.value),
                    );
                }
            }

            for (
                let i = startMinute;
                i <= (inputEndDate.get("minute") || 59);
                i += minutesInterval
            ) {
                minutesData.push({
                    label: `0${i}`.slice(-2),
                    value: i,
                });
            }

            setMinutesArray(minutesData);
        }
    }, [hourValue]);

    useEffect(() => {
        if (setSelectedValue) {
            setSelectedValue(
                (hourValue.label +
                    ":" +
                    minuteValue.label +
                    (is12Hour ? " " + meridiemValue.label : "")) as string,
            );
        }

        if (setSelectedTime)
            setSelectedTime(
                hourValue.value +
                    ":" +
                    minuteValue.value +
                    (is12Hour ? " " + meridiemValue.value : ""),
            );
    }, [hourValue, minuteValue, meridiemValue]);

    const handleKeyDown = (e: KeyboardEvent<Element>, index: number) => {
        setColRef(new Array(is12Hour ? 3 : 2).fill(false));

        switch (e.key) {
            case KEY.ARROW_RIGHT:
                if (index === 0) {
                    setColRef([false, true, false]);
                } else if (index === 1) {
                    setColRef([false, false, true]);
                }

                break;
            case KEY.ARROW_LEFT:
                if (index === 2) {
                    setColRef([false, true, false]);
                } else if (index === 1) {
                    setColRef([true, false, false]);
                }
                break;
            case KEY.ENTER:
            case KEY.ESCAPE:
                close && close();
                break;
            default:
                break;
        }
    };

    return (
        minutes?.length && (
            <div className="quill-wheel-picker">
                {hours && (
                    <WheelPicker
                        data={data?.[0] || hours}
                        selectedValue={hourValue.value}
                        setSelectedValue={(value) => {
                            setHourValue(
                                hours.find((hour) => hour.value === value) ||
                                    hours[0],
                            );
                        }}
                        isFocused={colRef[0]}
                        handleKeyDown={(e) => handleKeyDown(e, 0)}
                        position={"left"}
                        disabled={disabled}
                    />
                )}
                {minutes?.length && (
                    <WheelPicker
                        data={minutes}
                        selectedValue={minuteValue.value}
                        setSelectedValue={(value) => {
                            setMinuteValue(
                                minutes.find(
                                    (minute) => minute.value === value,
                                ) || minuteValue,
                            );
                        }}
                        isFocused={colRef[1]}
                        handleKeyDown={(e) => handleKeyDown(e, 1)}
                        position={is12Hour ? "center" : "right"}
                        listClassName="quill-wheel-picker__data-items__minute"
                        disabled={disabled}
                    />
                )}
                {meridiem && is12Hour && (
                    <WheelPicker
                        data={data?.[2] || meridiem}
                        selectedValue={meridiemValue.value}
                        setSelectedValue={(value) => {
                            setMeridiemValue(
                                meridiem.find((m) => m.value === value) ||
                                    meridiem[0],
                            );
                        }}
                        isFocused={colRef[2]}
                        handleKeyDown={(e) => handleKeyDown(e, 2)}
                        position={"right"}
                        disabled={disabled}
                    />
                )}
            </div>
        )
    );
};

export default TimeWheelPickerContainer;
