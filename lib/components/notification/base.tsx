import React from "react";
import "./notification.scss";
import { CaptionText, Text } from "../Typography";
import { NotificationIcon } from "./notification-icon";
import { LabelPairedXmarkSmRegularIcon } from "@deriv/quill-icons";
import clsx from "clsx";

export interface NotificationProps {
    className?: string;
    hasCloseButton?: boolean;
    icon: "info" | "failure" | "success" | "warning";
    message?: React.ReactNode;
    title?: React.ReactNode;
    status?: "unread" | "read";
}

export const Notification = ({
    className,
    hasCloseButton,
    icon,
    message,
    title,
    status,
}: NotificationProps) => {
    return (
        <div className={className}>
            <div className="body">
                <div className={clsx("icon", icon)}>
                    <NotificationIcon icon={icon} />
                </div>
                <div className="content">
                    <Text
                        className="title"
                        bold={status === "unread"}
                        size="sm"
                    >
                        {title}
                    </Text>
                    <CaptionText className="message" bold={false}>
                        {message}
                    </CaptionText>
                </div>
            </div>
            {hasCloseButton && (
                <button className={clsx("icon", "close")}>
                    <LabelPairedXmarkSmRegularIcon />
                </button>
            )}
        </div>
    );
};
