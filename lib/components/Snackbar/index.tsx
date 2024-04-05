import React, { ReactNode, useEffect, useState, HTMLAttributes } from "react";
import { Text } from "../Typography";
import "./snackbar.scss";
import clsx from "clsx";

interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
    icon?: ReactNode;
    message: string;
    actionText?: string;
    hasCloseButton?: boolean;
    onClose: () => void;
    onActionClick?: () => void;
    isOpen: boolean;
}

export const Snackbar = ({
    icon: Icon = "",
    message,
    actionText = "",
    onActionClick,
    hasCloseButton = true,
    isOpen = false,
    onClose,
    ...rest
}: SnackbarProps) => {
    const [animationSpeed, setAnimationSpeed] = useState("slow");
    useEffect(() => {
        if (isOpen) {
            setAnimationSpeed("slow");
            const timer = setTimeout(() => {
                onClose?.();
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [isOpen]);

    const handleClose = () => {
        onClose?.();
        setAnimationSpeed("fast");
    };

    const handleActionClick = () => {
        onActionClick?.();
        setAnimationSpeed("fast");
    };
    return (
        <>
            {isOpen && (
                <div
                    className={clsx(
                        "snackbar",
                        animationSpeed === "fast"
                            ? "fast-animation"
                            : "slow-animation",
                    )}
                    {...rest}
                >
                    {Icon && (
                        <div className="snackbar__icon--container">{Icon}</div>
                    )}
                    <div className="snackbar__message--container">
                        <Text className="snackbar__message" size="sm">
                            {message}
                        </Text>
                    </div>
                    {actionText && (
                        <button
                            type="button"
                            style={{ color: "#ffffff", padding: "4px" }}
                            onClick={handleActionClick}
                        >
                            {actionText}
                        </button>
                    )}
                    {hasCloseButton && (
                        <button
                            type="button"
                            style={{ color: "#ffffff", padding: "4px" }}
                            onClick={handleClose}
                        >
                            x
                        </button>
                    )}
                </div>
            )}
        </>
    );
};
