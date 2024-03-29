import React from "react";
import { Notification } from "../base";
import type { NotificationProps } from "../base";
import clsx from "clsx";

export interface NotificationBannerProps extends NotificationProps {
    className?: string;
}

// for desktop
const NotificationBanner = ({ className }: NotificationBannerProps) => {
    return (
        <Notification
            className={clsx("notification-banner", className)}
            hasCloseButton
        />
    );
};

export default NotificationBanner;
