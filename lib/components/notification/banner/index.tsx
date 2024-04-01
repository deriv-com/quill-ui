import React from "react";
import { Notification } from "../base";
import type { NotificationProps } from "../base";
import clsx from "clsx";

export interface NotificationBannerProps
    extends Omit<NotificationProps, "icon"> {
    className?: string;
    icon?: "info" | "failure" | "success" | "warning";
    isMobile?: boolean;
}

const NotificationBanner = ({
    className,
    icon = "info",
    isMobile,
    message,
    status = "unread",
    title,
}: NotificationBannerProps) => {
    return (
        <Notification
            className={clsx("notification-banner", className)}
            hasCloseButton={!isMobile}
            icon={icon}
            message={message}
            title={title}
            status={status}
        />
    );
};

export default NotificationBanner;
