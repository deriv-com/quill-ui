import { createContext } from "react";
import { NotificationBannerProps } from "@components/Notification/banner";
import { NotificationItemProps } from "@components/Notification/item";

export type NotificationsContextValue = {
    addBanner: (props: Omit<NotificationBannerProps, "id">) => void;
    addNotificationItem: (
        props: Omit<NotificationItemProps, "id" | "status">,
    ) => void;
    banners: NotificationBannerProps[];
    markAllNotificationsAsRead: () => void;
    markNotificationItemAsRead: (id: string) => void;
    notificationItems: NotificationItemProps[];
    removeAllNotificationItems: () => void;
    removeBanner: (id: string) => void;
    removeNotificationItem: (id: string) => void;
    updateBanners: (banners: NotificationBannerProps[]) => void;
    updateNotificationItems: (
        notificationItems: NotificationItemProps[],
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
