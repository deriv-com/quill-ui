import React from "react";
import { Notification } from "../base";
import type { NotificationProps } from "../base";
import clsx from "clsx";

export interface NotificationBannerProps
    extends Omit<NotificationProps, "icon" | "status" | "hasCloseButton"> {
    className?: string;
    type?: "info" | "failure" | "success" | "warning";
    isMobile?: boolean;
}

const NotificationBanner = ({
    className,
    type = "info",
    isMobile,
    message,
    title,
}: NotificationBannerProps) => {
    return (
        <Notification
            className={clsx("notification-banner", className)}
            hasCloseButton={!isMobile}
            icon={type}
            message={message}
            title={title}
        />
    );
};

export default NotificationBanner;
