import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { TYPE } from "../../../utils/notification-utils";
import { Notification } from "../base";
import type { NotificationProps } from "../base";

export interface NotificationBannerProps
    extends Omit<NotificationProps, "isBanner" | "status" | "hasCloseButton"> {
    autohideTimeout?: number;
    className?: string;
    type?: (typeof TYPE)[keyof typeof TYPE];
    isMobile?: boolean;
}

const NotificationBanner = ({
    autohideTimeout,
    className,
    type = "info",
    isMobile,
    onClick,
    onClose,
    ...rest
}: NotificationBannerProps) => {
    const [isHidden, setIsHidden] = useState(false);
    const intervalId = useRef<ReturnType<typeof setInterval>>();
    const timeoutId = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (autohideTimeout) {
            intervalId.current = setInterval(() => {
                handleClose();
            }, autohideTimeout);
        }
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

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        forceClose();
        onClick?.(e);
    };

    return (
        <Notification
            {...rest}
            className={clsx(
                `notification__banner${isMobile ? "--mobile" : ""}`,
                isHidden && "hidden",
                className,
            )}
            hasCloseButton={!isMobile}
            isBanner
            onClick={handleClick}
            onClose={forceClose}
            onSwipeDown={isMobile ? undefined : forceClose}
            onSwipeUp={isMobile ? forceClose : undefined}
            type={type}
        />
    );
};

export default NotificationBanner;
