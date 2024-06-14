import React, { ReactNode, useEffect, HTMLAttributes, useRef } from "react";
import { Text } from "@components/Typography";
import clsx from "clsx";
import { Button } from "@components/Button";
import { LabelPairedXmarkSmBoldIcon } from "@deriv/quill-icons";
import { useSnackbar } from "@hooks/useSnackbar";

export interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
    icon?: ReactNode;
    id?: string;
    isVisible?: boolean;
    message: string;
    actionText?: string;
    hasCloseButton?: boolean;
    onActionClick?: () => void;
    onCloseAction?: () => void;
}

export const Snackbar = ({
    icon: Icon,
    id,
    isVisible,
    message,
    actionText,
    onActionClick,
    onCloseAction,
    hasCloseButton = true,
    ...rest
}: SnackbarProps) => {
    const { removeSnackbar } = useSnackbar();
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const snackbarDelayedRemove = (id: string, delay: number = 4000) => {
        return setTimeout(() => {
            removeSnackbar(id);
        }, delay);
    };

    useEffect(() => {
        id && (timerRef.current = snackbarDelayedRemove(id));

        return () => {
            clearTimeout(timerRef.current ?? "");
        };
    }, [message]);

    const handleClose = () => {
        onCloseAction?.();
        if (timerRef) clearTimeout(timerRef.current ?? "");
        id && snackbarDelayedRemove(id, 100);
    };

    const handleActionClick = () => {
        onActionClick?.();
        handleClose();
    };

    return (
        <div
            {...rest}
            className={clsx(
                "snackbar",
                isVisible ? "slide-up" : "slide-up slide-down",
            )}
        >
            {Icon && <div className="snackbar__icon--container">{Icon}</div>}
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
                    iconPosition="start"
                    icon={<LabelPairedXmarkSmBoldIcon />}
                    color="white"
                    size="md"
                    onClick={handleClose}
                    data-testid="close-button"
                />
            )}
        </div>
    );
};
