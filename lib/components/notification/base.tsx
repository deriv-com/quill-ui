import React from "react";
import { LabelPairedXmarkSmRegularIcon } from "@deriv/quill-icons";
import clsx from "clsx";
import { useSwipeable } from "react-swipeable";
import { CaptionText, Text } from "../Typography";
import { NotificationIcon } from "./notification-icon";
import { STATUS, TYPE } from "../../utils/notification-utils";
import "./notification.scss";

export interface NotificationProps
    extends Omit<React.HTMLAttributes<HTMLAnchorElement>, "title"> {
    className?: string;
    hasCloseButton?: boolean;
    message?: React.ReactNode;
    onClose?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    onSwipeDown?: () => void;
    onSwipeUp?: () => void;
    status?: (typeof STATUS)[keyof typeof STATUS];
    title?: React.ReactNode;
    type?: (typeof TYPE)[keyof typeof TYPE];
}

export const Notification = ({
    className,
    hasCloseButton,
    message,
    onClose,
    onSwipeDown,
    onSwipeUp,
    status = "unread",
    title,
    type,
    ...rest
}: NotificationProps) => {
    const swipeHandlers = useSwipeable({
        onSwipedUp: onSwipeUp,
        onSwipedDown: onSwipeDown,
        trackMouse: true,
    });

    return (
        <a {...swipeHandlers} {...rest} className={className}>
            <div className="body">
                <div className={clsx("icon", type)}>
                    <NotificationIcon type={type} />
                </div>
                <div className="content">
                    <Text
                        className="title"
                        bold={status === STATUS.UNREAD}
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
                <button className={clsx("icon", "close")} onClick={onClose}>
                    <LabelPairedXmarkSmRegularIcon />
                </button>
            )}
        </a>
    );
};
