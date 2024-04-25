import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
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
        autohideTimeout: 4000,
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
            description:
                "Required. An array of NotificationBanners. Please refer to the NotificationBanner component docs for more details about props.",
            table: {
                type: {
                    summary: "Array<NotificationBannerProps & { id: string }>",
                },
            },
        },
    },
} satisfies Meta<typeof NotificationBanners>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
    render: (args) => {
        const [banners, setBanners] = useState([
            {
                id: "0",
                message: "This is an information message",
                title: "Information",
                type: TYPE.INFO,
            },
            {
                id: "1",
                message: "This is a warning message",
                title: "Warning",
                type: TYPE.WARNING,
            },
            {
                id: "2",
                message: "This is an error message",
                title: "Error",
                type: TYPE.ERROR,
            },
        ]);

        const handleClose = (id: string) => {
            setBanners(banners.filter((banner) => banner.id !== id));
        };

        return (
            <NotificationBanners
                {...args}
                banners={banners}
                onClose={handleClose}
            />
        );
    },
};

export const NotificationBannersDesktop: Story = {
    ...Template,
    parameters: { viewport: { defaultViewport: "desktop" } },
};

export const NotificationBannersMobile: Story = {
    ...Template,
    args: {
        isMobile: true,
    },
    parameters: { viewport: { defaultViewport: "mobile1" } },
};
