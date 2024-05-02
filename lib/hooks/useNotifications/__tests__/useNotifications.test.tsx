import { ReactNode } from "react";
import { renderHook, act } from "@testing-library/react";
import { useNotifications } from "..";
import { NotificationsProvider } from "@providers/notification/notificationsProvider";
import { STATUS } from "@utils/notification-utils";

describe("useNotifications", () => {
    const banners = [
        { title: "a", id: "0" },
        { title: "b", id: "1" },
    ];
    const notificationItems = [
        { title: "a", id: "0", status: STATUS.UNREAD },
        { title: "b", id: "1", status: STATUS.READ },
    ];
    const wrapper = ({ children }: { children: ReactNode }) => (
        <NotificationsProvider>{children}</NotificationsProvider>
    );
    it("should add one banner", () => {
        const { result } = renderHook(() => useNotifications(), { wrapper });

        act(() => {
            result.current.addBanner({ title: "a" });
        });

        expect(result.current.banners[0]).toHaveProperty("id");
    });
    it("should add one notification item", () => {
        const { result } = renderHook(() => useNotifications(), { wrapper });

        act(() => {
            result.current.addNotificationItem({ title: "a" });
        });

        expect(result.current.notificationItems[0]).toHaveProperty("id");
        expect(result.current.notificationItems[0]).toHaveProperty("status");
    });
    it("should update the list of banners with the new list", () => {
        const { result } = renderHook(() => useNotifications({ banners: [] }), {
            wrapper,
        });

        expect(result.current.banners).toHaveLength(0);

        act(() => {
            result.current.updateBanners(banners);
        });

        expect(result.current.banners).toHaveLength(2);
    });
    it("should update the list of notification items with the new list", () => {
        const { result } = renderHook(
            () => useNotifications({ notificationItems: [] }),
            { wrapper },
        );

        expect(result.current.notificationItems).toHaveLength(0);

        act(() => {
            result.current.updateNotificationItems(notificationItems);
        });

        expect(result.current.notificationItems).toHaveLength(2);
    });
    it("should mark one notification item as read", () => {
        const { result } = renderHook(
            () => useNotifications({ notificationItems }),
            { wrapper },
        );

        act(() => result.current.markNotificationItemAsRead("0"));

        expect(result.current.notificationItems[0].status).toBe(STATUS.READ);
    });
    it("should mark all notification items as read", () => {
        const { result } = renderHook(
            () => useNotifications({ notificationItems }),
            { wrapper },
        );

        act(() => result.current.markAllNotificationsAsRead());

        result.current.notificationItems.forEach((item) => {
            expect(item.status).toBe(STATUS.READ);
        });
    });
    it("should remove one of the 2 existing banners", () => {
        const { result } = renderHook(() => useNotifications({ banners }), {
            wrapper,
        });

        expect(result.current.banners).toHaveLength(2);

        act(() => {
            const id = result.current.banners[0].id;
            if (id) result.current.removeBanner(id);
        });

        expect(result.current.banners).toHaveLength(1);
    });
    it("should remove one of the 2 existing notification items", () => {
        const { result } = renderHook(
            () => useNotifications({ notificationItems }),
            { wrapper },
        );

        expect(result.current.notificationItems).toHaveLength(2);

        act(() => {
            const id = result.current.notificationItems[0].id;
            if (id) result.current.removeNotificationItem(id);
        });

        expect(result.current.notificationItems).toHaveLength(1);
    });
    it("should remove all notification items", () => {
        const { result } = renderHook(
            () => useNotifications({ notificationItems }),
            { wrapper },
        );

        expect(result.current.notificationItems).toHaveLength(2);

        act(() => result.current.removeAllNotificationItems());

        expect(result.current.notificationItems).toHaveLength(0);
    });
    it("should return banners with ids when receives initial banners without ids", () => {
        const { result } = renderHook(
            () => useNotifications({ banners: [{ title: "a" }] }),
            { wrapper },
        );
        expect(result.current.banners[0].id).toBeDefined();
    });
    it("should return notification items with ids when receives initial notification items without ids", () => {
        const { result } = renderHook(
            () => useNotifications({ notificationItems: [{ title: "a" }] }),
            { wrapper },
        );
        expect(result.current.notificationItems[0].id).toBeDefined();
    });
});
