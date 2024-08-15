import { THorizontalPosition } from "@types";
import { HTMLAttributes, ReactNode } from "react";

export interface WheelPickerProps extends HTMLAttributes<HTMLElement> {
    data: { value: string | number, label?: string |number| ReactNode }[];
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

export interface WheelPickerContainerProps extends Omit<WheelPickerProps, 'data' | 'setSelectedValue' | 'selectedValue'> {
    data: { value: string | number, label?: string | ReactNode }[][];
    inputValues?: (string | number)[];
    setInputValues?: (index: number,value: string | number ) => void;
    children?: React.ReactNode;
    close?: () => void;
    setSelectedValue?: (value: string| number) => void;
    containerHeight?: string;
}

export interface TimeWheelPickerContainerProps extends Omit<WheelPickerProps, 'data' | 'setSelectedValue' | 'selectedValue'>  {
    is12Hour: boolean;
    children?: React.ReactNode;
    minutesInterval?: number;
    hoursInterval?: number;
    locale?: string;
    close?: () => void;
    setSelectedValue?: (value: string| number) => void;
    startTimeIn24Format?: string;
    endTimeIn24Format?: string;
    selectedTime?: string;
    setSelectedTime?: (value: string) => void;
    data?: { value: string | number, label?: string | ReactNode }[][];
    containerHeight?: string;
}

export type TypeOfWheel = 'Time' | 'Generic' | 'Date' ;