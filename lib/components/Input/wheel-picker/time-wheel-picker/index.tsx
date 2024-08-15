import React, { forwardRef } from "react";
import { DropdownProvider } from "@providers/dropdown/dropdownProvider";
import { TimeWheelPickerContainer as WheelPicker } from "@components/Atom";
import { TWheelPickerContent, WheelPickerContent } from "../base";

export const TimeWheelPicker = forwardRef<
    HTMLDivElement,
    TWheelPickerContent<"Time">
>(({ children, ...rest }, ref) => {
    return (
        <DropdownProvider>
            <WheelPickerContent
                ref={ref}
                {...rest}
                wheelType="Time"
                WheelPickerContainer={WheelPicker}
            >
                {children}
            </WheelPickerContent>
        </DropdownProvider>
    );
});

export default TimeWheelPicker;
