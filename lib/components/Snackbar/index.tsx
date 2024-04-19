import React, {
    ReactNode,
    useEffect,
    useState,
    HTMLAttributes,
    useRef,
} from "react";
import { Text } from "../Typography";
import "./snackbar.scss";
import clsx from "clsx";
import { Button } from "../Button";
import { LabelPairedXmarkSmBoldIcon } from "@deriv/quill-icons";
import { useSnackbar } from "../../hooks/useSnackbar";
export interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
    icon?: ReactNode;
    message: string;
    actionText?: string;
    hasCloseButton?: boolean;
    onActionClick?: () => void;
}

export const Snackbar = ({
    icon: Icon,
    message,
    actionText,
    onActionClick,
    hasCloseButton = true,
    ...rest
}: SnackbarProps) => {
    const { queue, removeSnackbar } = useSnackbar();
    const [isOpen, setIsOpen] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const animationSpeedObj = Object.freeze({
        fast: "fast",
        slow: "slow",
    });
    const [animationSpeed, setAnimationSpeed] = useState<
        keyof typeof animationSpeedObj
    >(animationSpeedObj.slow);

    useEffect(() => {
        if (queue.length > 0) {
            setIsOpen(true);
            setAnimationSpeed(animationSpeedObj.slow);
            timerRef.current = setTimeout(() => {
                setIsOpen(false);
                removeSnackbar(); 
            }, 3000);
            return () => {
                clearTimeout(timerRef.current ?? "");
            };
        }
    }, [queue]);

    const handleClose = () => {
        if (timerRef) clearTimeout(timerRef.current ?? "");
        setAnimationSpeed(animationSpeedObj.fast);
        setTimeout(() => {
            setIsOpen(false);
            removeSnackbar();
        }, 1000);
    };

    const handleActionClick = () => {
        onActionClick?.();
        handleClose();
    };

    return (
        <div className="snackbar--container">
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
        </div>
    );
};
