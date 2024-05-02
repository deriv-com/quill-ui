import { v4 as uuid } from "uuid";
import React, { useState, PropsWithChildren } from "react";
import { NotificationsContext } from "./notificationsContext";
import { NotificationBannerProps } from "@components/Notification/banner";
import { NotificationItemProps } from "@components/Notification/item";
import { STATUS } from "@utils/notification-utils";

export const NotificationsProvider = ({ children }: PropsWithChildren) => {
    const [banners, setBanners] = useState<
        Array<NotificationBannerProps & { id: string }>
    >([]);
    const [notificationItems, setNotificationItems] = useState<
        Array<NotificationItemProps & { id: string }>
    >([]);

    const addBanner = (props: Omit<NotificationBannerProps, "id">) => {
        setBanners((prev) => [...prev, { ...props, id: uuid() }]);
    };

    const addNotificationItem = (
        props: Omit<NotificationItemProps, "id" | "status">,
    ) => {
        setNotificationItems((prev) => [
            { ...props, id: uuid(), status: STATUS.UNREAD },
            ...prev,
        ]);
    };

    const markAllNotificationsAsRead = () => {
        setNotificationItems((prev) =>
            prev.map((item) => ({ ...item, status: STATUS.READ })),
        );
    };

    const markNotificationItemAsRead = (id: string) => {
        setNotificationItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, status: STATUS.READ } : item,
            ),
        );
    };

    const removeAllNotificationItems = () => {
        setNotificationItems([]);
    };

    const removeBanner = (id: string) => {
        setBanners((prev) => prev.filter((banner) => banner.id !== id));
    };

    const removeNotificationItem = (id: string) => {
        setNotificationItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateBanners = (
        list: Array<NotificationBannerProps & { id?: string }>,
    ) => {
        setBanners(
            list.map((banner) => ({ ...banner, id: banner.id || uuid() })),
        );
    };

    const updateNotificationItems = (
        list: Array<NotificationItemProps & { id?: string }>,
    ) => {
        setNotificationItems(
            list.map((item) => ({ ...item, id: item.id || uuid() })),
        );
    };

    return (
        <NotificationsContext.Provider
            value={{
                addBanner,
                addNotificationItem,
                banners,
                markAllNotificationsAsRead,
                markNotificationItemAsRead,
                notificationItems,
                removeAllNotificationItems,
                removeBanner,
                removeNotificationItem,
                updateBanners,
                updateNotificationItems,
            }}
        >
            {children}
        </NotificationsContext.Provider>
    );
};
