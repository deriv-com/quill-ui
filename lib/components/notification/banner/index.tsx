import React from "react";
import clsx from "clsx";
import { TYPE } from "../../../utils/notification-utils";
import { Notification } from "../base";
import type { NotificationProps } from "../base";

export interface NotificationBannerProps
    extends Omit<NotificationProps, "icon" | "status" | "hasCloseButton"> {
    className?: string;
    type?: (typeof TYPE)[keyof typeof TYPE];
    isMobile?: boolean;
}

const NotificationBanner = ({
    className,
    type = "info",
    isMobile,
    onClose,
    ...rest
}: NotificationBannerProps) => {
    return (
        <Notification
            {...rest}
            className={clsx(
                `notification-banner${isMobile ? "__mobile" : ""}`,
                className,
            )}
            hasCloseButton={!isMobile}
            onClose={onClose}
            onSwipeDown={isMobile ? undefined : onClose}
            onSwipeUp={isMobile ? onClose : undefined}
            type={type}
        />
    );
};

export default NotificationBanner;
