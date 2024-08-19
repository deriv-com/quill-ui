import React, { forwardRef } from "react";
import { WheelPickerContainer as WheelPicker } from "@components/Atom";
import { TWheelPickerContent, WheelPickerContent } from "../base";
import { DropdownProvider } from "@providers/dropdown/dropdownProvider";

export const GenericWheelPicker = forwardRef<
    HTMLDivElement,
    TWheelPickerContent<"Generic">
>(({ children, ...rest }, ref) => {
    return (
        <DropdownProvider>
            <WheelPickerContent ref={ref} {...rest} container={WheelPicker}>
                {children}
            </WheelPickerContent>
        </DropdownProvider>
    );
});

export default GenericWheelPicker;
