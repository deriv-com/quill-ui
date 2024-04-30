import { createContext } from "react";
import { NotificationBannerProps } from "@components/Notification/banner";
import { NotificationItemProps } from "@components/Notification/item";

export type NotificationsContextValue = {
    addBanner: (props: Omit<NotificationBannerProps, "id">) => void;
    addNotificationItem: (
        props: Omit<NotificationItemProps, "id" | "status">,
    ) => void;
    banners: Array<NotificationBannerProps & { id: string }>;
    markAllNotificationsAsRead: () => void;
    markNotificationItemAsRead: (id: string) => void;
    notificationItems: Array<NotificationItemProps & { id: string }>;
    removeAllNotificationItems: () => void;
    removeBanner: (id: string) => void;
    removeNotificationItem: (id: string) => void;
    updateBanners: (
        banners: Array<NotificationBannerProps & { id: string }>,
    ) => void;
    updateNotificationItems: (
        notificationItems: Array<NotificationItemProps & { id: string }>,
    ) => void;
};

export const NotificationsContext = createContext<NotificationsContextValue>({
    addBanner: () => {},
    addNotificationItem: () => {},
    banners: [],
    markAllNotificationsAsRead: () => {},
    markNotificationItemAsRead: () => {},
    notificationItems: [],
    removeAllNotificationItems: () => {},
    removeBanner: () => {},
    removeNotificationItem: () => {},
    updateBanners: () => {},
    updateNotificationItems: () => {},
});
