import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import NotificationItem from "../item";
import type { NotificationItemProps } from "../item";

export interface NotificationItemsListProps {
    className?: string;
    items?: Array<NotificationItemProps & { id: string }>;
    isMobile?: boolean;
    onClick?: (itemId: string) => void;
    onClose?: (itemId: string) => void;
    onMarkAsRead?: (itemId: string) => void;
}

const NotificationItemsList = ({
    items = [],
    className,
    isMobile,
    onClick,
    onClose,
    onMarkAsRead,
}: NotificationItemsListProps) => {
    const timeoutIds = useRef<Array<ReturnType<typeof setTimeout>>>([]);

    useEffect(() => {
        return () => {
            if (timeoutIds.current.length) {
                timeoutIds.current.forEach((id) => clearTimeout(id));
            }
        };
    }, []);

    const handleClose = (id: string) => {
        const timeoutId = setTimeout(() => {
            onClose?.(id);
        }, 160);
        timeoutIds.current.push(timeoutId);
    };

    if (!items.length) return null;
    return (
        <div className={clsx("notification__items-list", className)}>
            {items.map(({ id, ...rest }) => (
                <NotificationItem
                    {...rest}
                    key={id}
                    isMobile={isMobile}
                    onClick={() => onClick?.(id)}
                    onClose={() => handleClose?.(id)}
                    onMarkAsRead={() => onMarkAsRead?.(id)}
                />
            ))}
        </div>
    );
};

export default NotificationItemsList;
