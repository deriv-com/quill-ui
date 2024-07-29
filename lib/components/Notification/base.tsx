import React from "react";
import {
    LabelPairedCheckSmBoldIcon,
    LabelPairedTrashSmBoldIcon,
    LabelPairedXmarkSmRegularIcon,
} from "@deriv/quill-icons";
import clsx from "clsx";
import { useSwipeable } from "react-swipeable";
import { CaptionText, Text } from "../Typography";
import { NotificationIcon } from "./notification-icon";
import { STATUS, TYPE } from "@utils/notification-utils";
import { IconButton } from "@components/Button";
import "./notification.scss";

export interface NotificationProps
    extends Omit<React.HTMLProps<HTMLAnchorElement>, "title"> {
    className?: string;
    hasCloseButton?: boolean;
    icon?: React.ReactNode;
    iconBackgroundColor?: string;
    isBanner?: boolean;
    message?: React.ReactNode;
    onClose?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    onMarkAsRead?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    onSwipeDown?: () => void;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeUp?: () => void;
    redirectTo?: string;
    status?: (typeof STATUS)[keyof typeof STATUS];
    timestamp?: number;
    title?: React.ReactNode;
    type?: (typeof TYPE)[keyof typeof TYPE];
}

const swipeConfig = {
    trackMouse: true,
    preventScrollOnSwipe: true,
};

export const Notification = ({
    className,
    hasCloseButton,
    icon,
    iconBackgroundColor,
    isBanner,
    message,
    onClose,
    onMarkAsRead,
    onSwipeDown,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    redirectTo,
    status = STATUS.UNREAD,
    timestamp,
    title,
    type,
    ...rest
}: NotificationProps) => {
    const formattedTime = `${new Date(timestamp ?? 0).getDate()} ${new Date(
        timestamp ?? 0,
    ).toLocaleString("en", {
        month: "short",
        year: "numeric",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
    })}`.replace(",", "");

    const swipeHandlers = useSwipeable({
        onSwipedUp: onSwipeUp,
        onSwipedDown: onSwipeDown,
        onSwipedLeft: onSwipeLeft,
        onSwipedRight: onSwipeRight,
        ...swipeConfig,
    });

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onClose?.(e);
    };

    return (
        <a
            {...rest}
            {...swipeHandlers}
            className={clsx("quill-notification", className)}
            href={redirectTo}
            onDragStart={(e) => e.preventDefault()}
        >
            <div className="body">
                <div
                    className={clsx("icon", type)}
                    style={{ backgroundColor: iconBackgroundColor }}
                >
                    {icon ?? <NotificationIcon type={type} />}
                    {!isBanner && status === STATUS.UNREAD && (
                        <div className="badge-unread" />
                    )}
                </div>
                <div className="details">
                    <Text
                        className="title"
                        bold={status === STATUS.UNREAD}
                        size="sm"
                    >
                        {title}
                    </Text>
                    {isBanner ? (
                        <CaptionText className="message" bold={false}>
                            {message}
                        </CaptionText>
                    ) : (
                        <Text className="message--one-liner" size="sm">
                            {message}
                        </Text>
                    )}
                    {!isBanner && timestamp && (
                        <CaptionText
                            aria-label="date-time"
                            className="date-time"
                        >
                            {formattedTime}
                        </CaptionText>
                    )}
                </div>
            </div>
            {isBanner && hasCloseButton && (
                <IconButton
                    color="black-white"
                    icon={<LabelPairedXmarkSmRegularIcon />}
                    className="close"
                    aria-label="close"
                    onClick={handleClose}
                    size="sm"
                    variant="tertiary"
                />
            )}
            {!isBanner && (
                <div className="buttons">
                    {status === STATUS.UNREAD && (
                        <IconButton
                            color="black"
                            icon={<LabelPairedCheckSmBoldIcon />}
                            className={clsx("icon", "mark-as-read")}
                            aria-label="mark-as-read"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onMarkAsRead?.(e);
                            }}
                            size="sm"
                            variant="tertiary"
                        />
                    )}
                    <IconButton
                        color="black"
                        icon={<LabelPairedTrashSmBoldIcon />}
                        className={clsx("icon", "delete")}
                        aria-label="delete"
                        onClick={handleClose}
                        size="sm"
                        variant="tertiary"
                    />
                </div>
            )}
        </a>
    );
};
