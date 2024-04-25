import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { STATUS, TYPE } from "../../../utils/notification-utils";
import { Notification } from "../base";
import type { NotificationProps } from "../base";

export interface NotificationItemProps
    extends Omit<NotificationProps, "isBanner" | "hasCloseButton"> {
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
    onClose,
    onMarkAsRead,
    ...rest
}: NotificationItemProps) => {
    const timeoutId = useRef<ReturnType<typeof setTimeout>>();
    const [shouldShowButtons, setShouldShowButtons] = React.useState(false);

    useEffect(() => {
        return () => {
            if (timeoutId.current) clearTimeout(timeoutId.current);
        };
    }, []);

    const handleClose = () => {
        timeoutId.current = setTimeout(() => {
            onClose?.();
        }, 160);
    };

    const handleMarkAsRead = (e?: React.MouseEvent<HTMLButtonElement>) => {
        setShouldShowButtons(false);
        onMarkAsRead?.(e);
    };

    const handleSwipe = (direction: string) => {
        setShouldShowButtons(direction === DIRECTION.LEFT);
    };

    return (
        <div className="notification-item-wrapper">
            <Notification
                {...rest}
                className={clsx(
                    `notification-item${isMobile ? "__mobile" : ""}`,
                    shouldShowButtons &&
                        `show-buttons${status === STATUS.READ ? "--read" : ""}`,
                    className,
                )}
                onClose={handleClose}
                onMarkAsRead={handleMarkAsRead}
                onSwipeLeft={
                    isMobile ? () => handleSwipe(DIRECTION.LEFT) : undefined
                }
                onSwipeRight={
                    isMobile ? () => handleSwipe(DIRECTION.RIGHT) : undefined
                }
                status={status}
                type={type}
            />
        </div>
    );
};

export default NotificationItem;
