import type { Meta, StoryObj } from "@storybook/react";
import NotificationBanner from ".";

const meta = {
    title: "Components/Notification/NotificationBanner",
    component: NotificationBanner,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    args: {
        message: "This is a notification message",
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
        icon: {
            options: ["info", "failure", "success", "warning"],
            control: { type: "radio" },
            description: "Optional.",
            table: {
                type: {
                    summary: "info | failure | success | warning | undefined",
                },
            },
        },
        status: {
            options: ["read", "unread"],
            control: { type: "radio" },
            description: "Optional.",
            table: {
                type: { summary: "read | unread | undefined" },
            },
        },
    },
} satisfies Meta<typeof NotificationBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotificationBannerDesktop: Story = {
    args: {
        isMobile: false,
    },
    parameters: { viewport: { defaultViewport: "desktop" } },
};

export const NotificationBannerMobile: Story = {
    args: {
        isMobile: true,
    },
    parameters: { viewport: { defaultViewport: "mobile2" } },
};
