import { useContext, useEffect } from "react";
import { NotificationsContext } from "@providers/notification/notificationsContext";
import { NotificationBannerProps } from "@components/Notification";
import { NotificationItemProps } from "@components/Notification/item";

interface UseNotificationsParams {
    banners?: Array<NotificationBannerProps & { id: string }>;
    notificationItems?: Array<NotificationItemProps & { id: string }>;
}

export const useNotifications = (params?: UseNotificationsParams) => {
    const { banners = [], notificationItems = [] } = params ?? {};
    const context = useContext(NotificationsContext);

    if (!context) {
        throw new Error(
            "useNotifications must be used within a NotificationsProvider",
        );
    }

    useEffect(() => {
        if (banners.length) context.updateBanners(banners);
        if (notificationItems.length)
            context.updateNotificationItems(notificationItems);
    }, []);

    return context;
};
