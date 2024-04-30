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
    type?: (typeof TYPE)[keyof typeof TYPE];
    isMobile?: boolean;
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
    ...rest
}: NotificationItemProps) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [isRead, setIsRead] = useState(status === STATUS.READ);
    const [shouldShowButtons, setShouldShowButtons] = useState(false);

    useEffect(() => {
        setIsRead(status === STATUS.READ);
    }, [status]);

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
        setShouldShowButtons(direction === DIRECTION.LEFT);
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
                // onBlur={() => setShouldShowButtons(false)}
                onBlurCapture={() => setShouldShowButtons(false)}
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
