import React, { ReactNode, useCallback, useState } from "react";
import { DropdownContextValue, DropdownContext } from "./dropdownContext";

export interface TDropdownProvider {
    children: ReactNode;
    onOpen?: () => void;
    onClose?: () => void;
}

export const DropdownProvider = ({
    children,
    onOpen,
    onClose,
}: TDropdownProvider) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | number>();

    const contextValue: DropdownContextValue = {
        isOpen,
        open: () => {
            if (isOpen) return;
            setIsOpen(true);
            onOpen?.();
        },
        close: () => {
            if (!isOpen) return;
            setIsOpen(false);
            onClose?.();
        },
        selectedValue,
        setSelectedValue: useCallback((value) => setSelectedValue(value), []),
    };

    return (
        <DropdownContext.Provider value={contextValue}>
            {children}
        </DropdownContext.Provider>
    );
};
