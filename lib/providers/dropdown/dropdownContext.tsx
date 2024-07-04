import React from "react";

export interface DropdownContextValue {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    selectedValue?: string | number;
    setSelectedValue: (value: string | number) => void;
}

export const DropdownContext = React.createContext<DropdownContextValue>({
    isOpen: false,
    open: () => {},
    close: () => {},
    selectedValue: "",
    setSelectedValue: () => {},
});
