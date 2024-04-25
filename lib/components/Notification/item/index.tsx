import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { TYPE } from "../../../utils/notification-utils";
import { Notification } from "../base";
import type { NotificationProps } from "../base";

export interface NotificationItemProps
    extends Omit<NotificationProps, "isBanner" | "hasCloseButton"> {
    className?: string;
    type?: (typeof TYPE)[keyof typeof TYPE];
    isMobile?: boolean;
}

const NotificationItem = ({
    className,
    type = "info",
    isMobile,
    onClose,
    ...rest
}: NotificationItemProps) => {
    const timeoutId = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        return () => {
            if (timeoutId.current) clearTimeout(timeoutId.current);
        };
    }, []);

    const handleClose = () => {
        timeoutId.current = setTimeout(() => {
            onClose?.();
        }, 240);
    };

    return (
        <Notification
            {...rest}
            className={clsx(
                `notification-item${isMobile ? "__mobile" : ""}`,
                className,
            )}
            hasCloseButton={!isMobile}
            onClose={handleClose}
            type={type}
        />
    );
};

export default NotificationItem;
