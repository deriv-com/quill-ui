import React, { useEffect, useRef, useState } from "react";
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

export const NotificationItemsList = ({
    items = [],
    className,
    isMobile,
    onClick,
    onClose,
    onMarkAsRead,
}: NotificationItemsListProps) => {
    const [activeItemId, setActiveItemId] = useState("");
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
        <div className={clsx("quill-notification__items-list", className)}>
            {items.map(({ id, ...rest }) => (
                <NotificationItem
                    {...rest}
                    key={id}
                    isMobile={isMobile}
                    onClick={() => onClick?.(id)}
                    onClose={() => handleClose?.(id)}
                    onMarkAsRead={() => onMarkAsRead?.(id)}
                    onShowingButtons={
                        isMobile ? () => setActiveItemId(id) : undefined
                    }
                    showButtons={!!isMobile && activeItemId === id}
                />
            ))}
        </div>
    );
};

export default NotificationItemsList;
