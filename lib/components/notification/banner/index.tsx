import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { TYPE } from "../../../utils/notification-utils";
import { Notification } from "../base";
import type { NotificationProps } from "../base";

export interface NotificationBannerProps
    extends Omit<NotificationProps, "icon" | "status" | "hasCloseButton"> {
    autohideTimeout?: number;
    className?: string;
    type?: (typeof TYPE)[keyof typeof TYPE];
    isMobile?: boolean;
}

const NotificationBanner = ({
    autohideTimeout = 4000,
    className,
    type = "info",
    isMobile,
    onClose,
    ...rest
}: NotificationBannerProps) => {
    const [isHidden, setIsHidden] = useState(false);
    const intervalId = useRef<ReturnType<typeof setInterval>>();
    const timeoutId = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        intervalId.current = setInterval(() => {
            handleClose();
        }, autohideTimeout);
        return () => {
            if (intervalId.current) clearInterval(intervalId.current);
            if (timeoutId.current) clearTimeout(timeoutId.current);
        };
    }, []);

    const handleClose = () => {
        setIsHidden(true);
        timeoutId.current = setTimeout(() => {
            onClose?.();
        }, 240);
    };

    const forceClose = () => {
        if (intervalId.current) clearInterval(intervalId.current);
        handleClose();
    };

    return (
        <Notification
            {...rest}
            className={clsx(
                `notification-banner${isMobile ? "__mobile" : ""}`,
                isHidden && "hidden",
                className,
            )}
            hasCloseButton={!isMobile}
            isBanner
            onClose={forceClose}
            onSwipeDown={isMobile ? undefined : forceClose}
            onSwipeUp={isMobile ? forceClose : undefined}
            type={type}
        />
    );
};

export default NotificationBanner;
