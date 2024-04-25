import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import NotificationItemsList from ".";
import { STATUS, TYPE } from "../../../utils/notification-utils";

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
            },
            defaultViewport: "desktop",
        },
    },
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

const Template: Story = {
    render: (args) => {
        const items_list = [
            {
                id: "0",
                message: "This is a very very long information message",
                redirectTo: "https://www.example.com",
                status: STATUS.UNREAD,
                timestamp: new Date("2024-04-23T09:24:00").getTime(),
                title: "Information",
                type: TYPE.INFO,
            },
            {
                id: "1",
                message: "This is a very very long warning message",
                redirectTo: "https://www.example.com",
                status: STATUS.UNREAD,
                timestamp: new Date("2024-04-23T09:24:00").getTime(),
                title: "Warning",
                type: TYPE.WARNING,
            },
            {
                id: "2",
                message: "This is a very very long error message",
                redirectTo: "https://www.example.com",
                status: STATUS.READ,
                timestamp: new Date("2024-04-23T09:24:00").getTime(),
                title: "Error",
                type: TYPE.ERROR,
            },
        ];
        const [items, setItems] = useState([
            ...items_list,
            ...items_list.map((item) => ({ ...item, id: `${item.id}_unique` })),
        ]);

        const handleClose = (id: string) => {
            setItems((items) => items.filter((item) => item.id !== id));
        };
        const handleMarkAsRead = (id: string) => {
            setItems((items) =>
                items.map((item) =>
                    item.id === id ? { ...item, status: STATUS.READ } : item,
                ),
            );
        };

        return (
            <NotificationItemsList
                {...args}
                items={items}
                onClose={handleClose}
                onMarkAsRead={handleMarkAsRead}
            />
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
    parameters: { viewport: { defaultViewport: "mobile1" } },
};
