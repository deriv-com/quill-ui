import React, { ReactNode, useEffect, useState, HTMLAttributes } from "react";
import { Text } from "@components/Typography";
import "./snackbar.scss";
import clsx from "clsx";
import { Button } from "../Button";
import { LabelPairedXmarkSmBoldIcon } from "@deriv/quill-icons";

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
    icon: Icon,
    message,
    actionText,
    onActionClick,
    hasCloseButton = true,
    isOpen = false,
    onClose,
    ...rest
}: SnackbarProps) => {
    const animationSpeedObj = Object.freeze({
        fast: "fast",
        slow: "slow",
    });

    const [animationSpeed, setAnimationSpeed] = useState<
        keyof typeof animationSpeedObj
    >(animationSpeedObj.slow);
    useEffect(() => {
        if (isOpen) {
            setAnimationSpeed(animationSpeedObj.slow);
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
        setAnimationSpeed(animationSpeedObj.fast);
    };

    const handleActionClick = () => {
        onActionClick?.();
        setAnimationSpeed(animationSpeedObj.fast);
    };
    return (
        <>
            {isOpen && (
                <div
                    className={clsx(
                        "snackbar",
                        animationSpeed === animationSpeedObj.fast
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
                        <Button
                            variant="tertiary"
                            label={actionText}
                            color="white"
                            onClick={handleActionClick}
                        />
                    )}
                    {hasCloseButton && (
                        <Button
                            variant="tertiary"
                            label={<LabelPairedXmarkSmBoldIcon />}
                            color="white"
                            onClick={handleClose}
                            data-testid="close-button"
                        />
                    )}
                </div>
            )}
        </>
    );
};
