import type { Meta, StoryObj } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import NotificationItemsList from ".";
import { STATUS, TYPE } from "../../../utils/notification-utils";
import { NotificationsProvider } from "@providers/notification/notificationsProvider";
import { useNotifications } from "@hooks/useNotifications";
import { AddNewNotificationTestButtons } from "../test-buttons";

const meta = {
    title: "Components/Notification/NotificationItemsList",
    component: NotificationItemsList,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    parameters: {
        viewport: {
            viewports: {
                ...MINIMAL_VIEWPORTS,
                desktop: {
                    name: "desktop",
                    styles: {
                        width: "100%",
                        height: "100%",
                    },
                },
                iphoneSE: {
                    name: "iphoneSE",
                    styles: {
                        width: "375px",
                        height: "667px",
                    },
                },
            },
            defaultViewport: "desktop",
        },
        docs: {
            description: {
                component:
                    "*NOTE: You can wrap your app with `NotificationsProvider` and use `useNotifications()` hook available in this library for managing notifications state (CRUD operations) using context.",
            },
        },
    },
    decorators: [
        (Story) => (
            <NotificationsProvider>
                <Story />
            </NotificationsProvider>
        ),
    ],
    argTypes: {
        className: {
            control: { type: null },
            description: "Optional.",
            table: {
                type: { summary: "string | undefined" },
            },
        },
        items: {
            description:
                "Required. An array of NotificationItems. Please refer to the NotificationItem component docs for more details about props.",
            table: {
                type: {
                    summary: "Array<NotificationItemProps & { id: string }>",
                },
            },
        },
    },
} satisfies Meta<typeof NotificationItemsList>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems = [
    {
        id: "0",
        message: "This is a very very long Information message",
        redirectTo: "https://www.example.com",
        status: STATUS.UNREAD,
        timestamp: new Date("2024-04-23T09:24:00").getTime(),
        title: "Information",
        type: TYPE.INFO,
    },
    {
        id: "1",
        message: "This is a very very very long Warning message",
        redirectTo: "https://www.example.com",
        status: STATUS.UNREAD,
        timestamp: new Date("2024-04-23T09:24:00").getTime(),
        title: "Warning",
        type: TYPE.WARNING,
    },
    {
        id: "2",
        message: "This is a very very very long Error message",
        redirectTo: "https://www.example.com",
        status: STATUS.READ,
        timestamp: new Date("2024-04-23T09:24:00").getTime(),
        title: "Error",
        type: TYPE.ERROR,
    },
];
const initialNotifications = [
    ...basicItems,
    ...basicItems.map((item) => ({ ...item, id: `${item.id}_unique` })),
];

const Template: Story = {
    render: (args) => {
        const {
            addNotificationItem,
            markAllNotificationsAsRead,
            markNotificationItemAsRead,
            notificationItems,
            removeAllNotificationItems,
            removeNotificationItem,
        } = useNotifications({ notificationItems: initialNotifications });

        return (
            <>
                <AddNewNotificationTestButtons
                    addNotification={addNotificationItem}
                    markAllAsRead={markAllNotificationsAsRead}
                    removeAllNotifications={removeAllNotificationItems}
                />
                <NotificationItemsList
                    {...args}
                    items={notificationItems}
                    onClose={removeNotificationItem}
                    onMarkAsRead={markNotificationItemAsRead}
                />
            </>
        );
    },
};

export const NotificationItemsListDesktop: Story = {
    ...Template,
    parameters: { viewport: { defaultViewport: "desktop" } },
};

export const NotificationItemsListMobile: Story = {
    ...Template,
    args: {
        isMobile: true,
    },
    parameters: { viewport: { defaultViewport: "iphoneSE" } },
};
