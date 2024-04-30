import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { STATUS, TYPE } from "@utils/notification-utils";
import { Notification } from "../base";
import type { NotificationProps } from "../base";

export interface NotificationItemProps
    extends Omit<
        NotificationProps,
        | "isBanner"
        | "hasCloseButton"
        | "onSwipeDown"
        | "onSwipeLeft"
        | "onSwipeRight"
        | "onSwipeUp"
    > {
    className?: string;
    isMobile?: boolean;
    onShowingButtons?: () => void;
    showButtons: boolean;
    type?: (typeof TYPE)[keyof typeof TYPE];
}

const DIRECTION = {
    LEFT: "left",
    RIGHT: "right",
};

const NotificationItem = ({
    className,
    status,
    type = "info",
    isMobile,
    onClick,
    onClose,
    onMarkAsRead,
    onShowingButtons,
    showButtons,
    ...rest
}: NotificationItemProps) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [isRead, setIsRead] = useState(status === STATUS.READ);
    const [shouldShowButtons, setShouldShowButtons] = useState(false);

    useEffect(() => {
        setIsRead(status === STATUS.READ);
    }, [status]);

    useEffect(() => {
        setShouldShowButtons(showButtons);
    }, [showButtons]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        handleMarkAsRead();
        onClick?.(e);
    };

    const handleClose = () => {
        setIsDeleted(true);
        onClose?.();
    };

    const handleMarkAsRead = (e?: React.MouseEvent<HTMLButtonElement>) => {
        setShouldShowButtons(false);
        setIsRead(true);
        onMarkAsRead?.(e);
    };

    const handleSwipe = (direction: string) => {
        const isLeft = direction === DIRECTION.LEFT;
        setShouldShowButtons(isLeft);
        if (isLeft) onShowingButtons?.();
    };

    return (
        <div
            className={clsx(
                "notification__item-wrapper",
                isDeleted && "deleted",
            )}
        >
            <Notification
                {...rest}
                className={clsx(
                    `notification__item${isMobile ? "--mobile" : ""}`,
                    shouldShowButtons &&
                        `show-buttons${isRead ? "--read" : ""}`,
                    className,
                )}
                onBlur={() => setShouldShowButtons(false)}
                onClick={handleClick}
                onClose={handleClose}
                onMarkAsRead={handleMarkAsRead}
                onSwipeLeft={
                    isMobile ? () => handleSwipe(DIRECTION.LEFT) : undefined
                }
                onSwipeRight={
                    isMobile ? () => handleSwipe(DIRECTION.RIGHT) : undefined
                }
                status={isRead ? STATUS.READ : STATUS.UNREAD}
                type={type}
            />
        </div>
    );
};

export default NotificationItem;
