import React from "react";
import clsx from "clsx";
import NotificationItem from "../item";
import type { NotificationItemProps } from "../item";

export interface NotificationBannersProps {
    className?: string;
    items?: Array<NotificationItemProps & { id: string }>;
    isMobile?: boolean;
    onClose?: (bannerId: string) => void;
}

const NotificationItemsList = ({
    items = [],
    className,
    isMobile,
    onClose,
}: NotificationBannersProps) => {
    if (!items.length) return null;
    return (
        <div
            className={clsx(
                `notification-items-list${isMobile ? "__mobile" : ""}`,
                className,
            )}
        >
            {items.map(({ id, ...rest }) => (
                <NotificationItem
                    {...rest}
                    key={id}
                    isMobile={isMobile}
                    onClose={() => onClose?.(id)}
                />
            ))}
        </div>
    );
};

export default NotificationItemsList;
