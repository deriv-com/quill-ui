import React, { ReactNode, useEffect, HTMLAttributes, useRef } from "react";
import { Text } from "@components/Typography";
import clsx from "clsx";
import { Button } from "@components/Button";
import { LabelPairedXmarkSmBoldIcon } from "@deriv/quill-icons";
import { useSnackbar } from "@hooks/useSnackbar";
import { useOnClickOutside } from "usehooks-ts";
import { TDefaultColor } from "@types";
import "./snackbar.scss";

export interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
    icon?: ReactNode;
    id?: string;
    isVisible?: boolean;
    message: ReactNode;
    actionText?: string;
    hasCloseButton?: boolean;
    hasFixedHeight?: boolean;
    onActionClick?: () => void;
    onCloseAction?: () => void;
    onSnackbarRemove?: () => void;
    delay?: number;
    standalone?: boolean;
    status?: "fail" | "neutral";
}

export const Snackbar = ({
    icon: Icon,
    id,
    isVisible,
    message,
    actionText,
    onActionClick,
    onCloseAction,
    onSnackbarRemove,
    hasCloseButton = true,
    hasFixedHeight = true,
    delay,
    standalone = true,
    status = "neutral",
    ...rest
}: SnackbarProps) => {
    const { removeSnackbar } = useSnackbar();
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const snackbarDelayedRemove = ({
        id,
        onSnackbarRemove,
        delay = 4000,
    }: {
        id: string;
        onSnackbarRemove?: () => void;
        delay?: number;
    }) => {
        return setTimeout(() => {
            removeSnackbar(id, onSnackbarRemove);
        }, delay);
    };

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (id) {
            if (status === "neutral" || !hasCloseButton || delay !== undefined) {
                timerRef.current = snackbarDelayedRemove({
                    id,
                    onSnackbarRemove,
                    delay: delay || 4000,
                });
            }
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [message, status, hasCloseButton, delay, id, onSnackbarRemove]);

    const handleClose = () => {
        onCloseAction?.();
        if (timerRef.current) clearTimeout(timerRef.current);
        id && removeSnackbar(id, onSnackbarRemove);
    };

    const handleActionClick = () => {
        onActionClick?.();
        handleClose();
    };

    id && useOnClickOutside(ref, () => removeSnackbar(id, onSnackbarRemove));

    if (standalone && !isVisible) return null;

    const color = {
        neutral: "white-black",
        fail: "white",
    };

    const buttonColor = color[status] as TDefaultColor;

    return (
        <div
            {...rest}
            className={clsx(
                "quill-snackbar",
                `quill-snackbar__status--${status}`,
                isVisible ? "slide-up" : "slide-up slide-down",
            )}
            ref={ref}
        >
            {Icon && (
                <div className={clsx("quill-snackbar__icon--container")}>
                    {React.isValidElement(Icon) &&
                        React.cloneElement(Icon, {
                            fill: `var(--component-snackbar-icon-${status})`,
                            ...Icon.props,
                        })}
                </div>
            )}
            <div className="quill-snackbar__message--container">
                <Text
                    className={clsx(
                        "quill-snackbar__message",
                        hasFixedHeight &&
                            "quill-snackbar__message--has-fix-height",
                    )}
                    size="sm"
                    style={{
                        color: `var(--component-snackbar-label-color-${status})`,
                    }}
                >
                    {message}
                </Text>
            </div>
            {actionText && (
                <Button
                    variant="tertiary"
                    label={actionText}
                    color={buttonColor}
                    onClick={handleActionClick}
                />
            )}
            {hasCloseButton && (
                <Button
                    variant="tertiary"
                    iconPosition="start"
                    icon={<LabelPairedXmarkSmBoldIcon />}
                    color={buttonColor}
                    size="md"
                    onClick={handleClose}
                    data-testid="close-button"
                />
            )}
        </div>
    );
};
