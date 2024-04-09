import type { Meta, StoryObj } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import { fn } from "@storybook/test";
import NotificationBanners from ".";
import { TYPE } from "../../../utils/notification-utils";

const meta = {
    title: "Components/Notification/NotificationBanners",
    component: NotificationBanners,
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
    args: {
        banners: [
            {
                message: "This is an information message",
                title: "Information",
                type: TYPE.INFO,
            },
            {
                message: "This is a warning message",
                title: "Warning",
                type: TYPE.WARNING,
            },
            {
                message: "This is an error message",
                title: "Error",
                type: TYPE.ERROR,
            },
        ],
        onClose: fn(),
    },
    argTypes: {
        className: {
            control: { type: null },
            description: "Optional.",
            table: {
                type: { summary: "string | undefined" },
            },
        },
        banners: {
            description: "Required.",
            table: {
                type: {
                    summary:
                        "Array<{ id: string; message?: ReactNode; title?: string; type?: info | error | success | warning; }>",
                },
            },
        },
    },
} satisfies Meta<typeof NotificationBanners>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotificationBannersDesktop: Story = {
    parameters: { viewport: { defaultViewport: "desktop" } },
};

export const NotificationBannersMobile: Story = {
    args: {
        isMobile: true,
    },
    parameters: { viewport: { defaultViewport: "mobile1" } },
};
