import type { Meta, StoryObj } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import { fn } from "@storybook/test";
import { STATUS, TYPE } from "@utils/notification-utils";
import NotificationItem from ".";
import { LabelPairedPlaceholderCaptionBoldIcon } from "@deriv/quill-icons";

const icons: Record<string, object | null> = {
    custom_icon: <LabelPairedPlaceholderCaptionBoldIcon />,
    default_icon: null,
};

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
    },
    args: {
        redirectTo: "https://www.example.com",
        message:
            "The redirectTo prop can be used to redirect to a desired page when the notification is clicked.",
        onClick: fn(),
        onClose: fn(),
        onMarkAsRead: fn(),
        timestamp: new Date("2024-04-23T09:24:00").getTime(),
        title: "Hint",
        isMobile: false,
        showButtons: false,
    },
    argTypes: {
        className: {
            control: false,
            description: "Optional.",
            table: {
                type: { summary: "string | undefined" },
            },
        },
        icon: {
            description: "Optional. Custom icon component.",
            options: Object.keys(icons),
            mapping: icons,
            control: "radio",
            table: {
                type: { summary: "ReactNode | undefined" },
            },
        },
        iconBackgroundColor: {
            description:
                "Optional. Custom background color for the icon of the notification.",
            control: { type: "color" },
            table: {
                type: { summary: "string | undefined" },
                disable: true,
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
            description: "Optional. Description message of the notification.",
            table: {
                type: { summary: "string | ReactNode | undefined" },
            },
        },
        redirectTo: {
            description:
                "Optional. Passed to href attribute of the anchor tag.",
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
        title: {
            description: "Optional. Title of the notification.",
            table: {
                type: { summary: "string | ReactNode | undefined" },
            },
        },
        timestamp: {
            description:
                "Optional. Timestamp in milliseconds. Transforms to a human-readable date and time.",
        },
        type: {
            options: [TYPE.INFO, TYPE.ERROR, TYPE.SUCCESS, TYPE.WARNING],
            control: { type: "radio" },
            description:
                "Optional. Defaults to `info`. Controls which icon to display. A custom icon can be passed using the `icon` prop. Icon background color can be customized using the `iconBackgroundColor`.",
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
        <div style={{ width: "calc(100% - 32px)", height: "98px" }}>
            <NotificationItem {...args} />
        </div>
    ),
};

export const NotificationItemMobile: Story = {
    args: {
        isMobile: true,
    },
    parameters: { viewport: { defaultViewport: "iphoneSE" } },
    render: (args) => (
        <div style={{ width: "calc(100vw - 32px)", height: "98px" }}>
            <NotificationItem {...args} />
        </div>
    ),
};
