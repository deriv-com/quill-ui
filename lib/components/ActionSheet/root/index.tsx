import { useState, createContext, useEffect, useCallback } from "react";
import { RootProps } from "../types";

export interface ActionSheetContextType {
    handleOpen?: () => void;
    handleClose?: () => void;
}

export const ActionSheetContext = createContext<
    ActionSheetContextType & Omit<RootProps, "onOpen">
>({
    show: false,
});

const Root = ({
    isOpen,
    children,
    className,
    position = "right",
    type = "modal",
    expandable = true,
    shouldBlurOnClose = false,
    onOpen,
    onClose,
}: RootProps) => {
    const [show, setShow] = useState(isOpen);

    const handleOpen = () => {
        onOpen?.();
        setShow(true);
        document.body.style.overflow = "hidden";
    };

    const handleClose = useCallback(() => {
        onClose?.();
        setShow(false);
        document.body.style.overflow = "auto";
        if (shouldBlurOnClose) (document?.activeElement as HTMLElement)?.blur();
    }, [onClose, shouldBlurOnClose]);

    useEffect(() => {
        if (!isOpen) {
            handleClose();
        } else {
            handleOpen();
        }
    }, [isOpen, handleClose]);

    return (
        <ActionSheetContext.Provider
            value={{
                show,
                handleOpen,
                handleClose,
                position,
                type,
                expandable,
                className,
            }}
        >
            {children}
        </ActionSheetContext.Provider>
    );
};

export default Root;
