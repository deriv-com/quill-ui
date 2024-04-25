import type { Meta, StoryObj } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import { fn } from "@storybook/test";
import { STATUS, TYPE } from "../../../utils/notification-utils";
import NotificationItem from ".";

const meta = {
    title: "Components/Notification/NotificationItem",
    component: NotificationItem,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
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
    args: {
        href: "https://www.example.com",
        message:
            "Notification: use href or onClick to redirect to a desired page.",
        onClick: fn(),
        onClose: fn(),
        onMarkAsRead: fn(),
        timestamp: new Date("2024-04-23T09:24:00").getTime(),
        title: "Title",
    },
    argTypes: {
        className: {
            control: { type: null },
            description: "Optional.",
            table: {
                type: { summary: "string | undefined" },
            },
        },
        isMobile: {
            control: { type: "boolean" },
            description: "Optional.",
            table: {
                type: { summary: "boolean | undefined" },
            },
        },
        message: {
            table: {
                type: { summary: "string | ReactNode | undefined" },
            },
        },
        title: {
            table: {
                type: { summary: "string | ReactNode | undefined" },
            },
        },
        status: {
            options: [STATUS.READ, STATUS.UNREAD],
            control: { type: "radio" },
            description: "Optional. Defaults to 'unread'.",
            table: {
                type: {
                    summary: "'read' | 'unread' | undefined",
                },
            },
        },
        type: {
            options: [TYPE.INFO, TYPE.ERROR, TYPE.SUCCESS, TYPE.WARNING],
            control: { type: "radio" },
            description: "Optional.",
            table: {
                type: {
                    summary:
                        "'info' | 'error' | 'success' | 'warning' | undefined",
                },
            },
        },
    },
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotificationItemDesktop: Story = {
    parameters: { viewport: { defaultViewport: "desktop" } },
    render: (args) => (
        <div style={{ width: "360px" }}>
            <NotificationItem {...args} />
        </div>
    ),
};

export const NotificationItemMobile: Story = {
    args: {
        isMobile: true,
    },
    parameters: { viewport: { defaultViewport: "mobile1" } },
    render: (args) => (
        <div style={{ width: "calc(100vw - 32px)" }}>
            <NotificationItem {...args} />
        </div>
    ),
};
