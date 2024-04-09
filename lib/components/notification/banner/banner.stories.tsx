import type { Meta, StoryObj } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import { fn } from "@storybook/test";
import { TYPE } from "../../../utils/notification-utils";
import NotificationBanner from ".";

const meta = {
    title: "Components/Notification/NotificationBanner",
    component: NotificationBanner,
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
    parameters: { viewport: { defaultViewport: "mobile1" } },
    render: (args) => (
        <div
            style={{
                position: "absolute",
                top: "8px",
                left: "8px",
                width: "calc(100vw - 16px)",
            }}
        >
            <NotificationBanner {...args} />
        </div>
    ),
};
