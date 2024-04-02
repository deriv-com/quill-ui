import React from "react";
import { LabelPairedXmarkSmRegularIcon } from "@deriv/quill-icons";
import clsx from "clsx";
import { CaptionText, Text } from "../Typography";
import { NotificationIcon } from "./notification-icon";
import { TYPE } from "@utils/notification-utils";
import "./notification.scss";

export interface NotificationProps
    extends Omit<React.HTMLAttributes<HTMLAnchorElement>, "title"> {
    className?: string;
    hasCloseButton?: boolean;
    message?: React.ReactNode;
    status?: "unread" | "read";
    title?: React.ReactNode;
    type?: (typeof TYPE)[keyof typeof TYPE];
}

export const Notification = ({
    className,
    hasCloseButton,
    message,
    status = "unread",
    title,
    type,
    ...rest
}: NotificationProps) => {
    return (
        <a className={className} {...rest}>
            <div className="body">
                <div className={clsx("icon", type)}>
                    <NotificationIcon type={type} />
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
        </a>
    );
};
