import React, { ReactNode, useCallback, useState } from "react";
import { DropdownContextValue, DropdownContext } from "./dropdownContext";

export interface TDropdownProvider {
    children: ReactNode;
}

export const DropdownProvider = ({ children }: TDropdownProvider) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | number>();

    const contextValue: DropdownContextValue = {
        isOpen,
        open: useCallback(() => setIsOpen(true), []),
        close: useCallback(() => setIsOpen(false), []),
        selectedValue,
        setSelectedValue: useCallback((value) => setSelectedValue(value), []),
    };

    return (
        <DropdownContext.Provider value={contextValue}>
            {children}
        </DropdownContext.Provider>
    );
};
