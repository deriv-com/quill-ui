import { THorizontalPosition } from "@types";
import { HTMLAttributes, ReactNode } from "react";

export type TWheelTypeSelectItem = {
    value: string | number;
    label?: ReactNode;
};
export interface WheelPickerProps extends HTMLAttributes<HTMLElement> {
    data: TWheelTypeSelectItem[];
    selectedValue: string | number;
    setSelectedValue: (value: string | number) => void;
    handleKeyDown?: (e: React.KeyboardEvent) => void;
    isFocused?: boolean;
    dropDownItemClassName?: string;
    containerClassName?: string;
    listClassName?: string;
    position?: THorizontalPosition | undefined;
    containerHeight?: string;
    disabled?: boolean;
}
export interface WheelPickerContainerProps
    extends Omit<
        WheelPickerProps,
        "data" | "setSelectedValue" | "selectedValue"
    > {
    data: TWheelTypeSelectItem[][];
    inputValues?: (string | number)[];
    setInputValues?: (index: number, value: string | number) => void;
    children?: React.ReactNode;
    close?: () => void;
    setSelectedValue?: (value: string | number) => void;
    containerHeight?: string;
}
export interface TimeWheelPickerContainerProps
    extends Omit<
        WheelPickerProps,
        "data" | "setSelectedValue" | "selectedValue"
    > {
    is12Hour: boolean;
    children?: React.ReactNode;
    minutesInterval?: number;
    hoursInterval?: number;
    locale?: string;
    close?: () => void;
    setSelectedValue?: (value: string | number) => void;
    startTimeIn24Format?: string;
    endTimeIn24Format?: string;
    selectedTime?: string;
    setSelectedTime?: (value: string) => void;
    data?: TWheelTypeSelectItem[][];
    containerHeight?: string;
}
export type TTypeOfWheel = "Time" | "Generic" | "Date";
