import type { Meta, StoryObj } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import { fn } from "@storybook/test";
import { TYPE } from "../../../utils/notification-utils";
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
        message: "This is a notification message",
        onClick: fn(),
        onClose: fn(),
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
        type: {
            options: [TYPE.INFO, TYPE.ERROR, TYPE.SUCCESS, TYPE.WARNING],
            control: { type: "radio" },
            description: "Optional.",
            table: {
                type: {
                    summary: "info | error | success | warning | undefined",
                },
            },
        },
    },
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotificationItemExample: Story = {
    args: {
        isMobile: false,
    },
    parameters: { viewport: { defaultViewport: "desktop" } },
    render: (args) => (
        <div style={{ width: "360px" }}>
            <NotificationItem {...args} />
        </div>
    ),
};
