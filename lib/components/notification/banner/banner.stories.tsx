import type { Meta, StoryObj } from "@storybook/react";
import NotificationBanner from ".";

const meta = {
    title: "Components/Notification/NotificationBanner",
    component: NotificationBanner,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    args: {},
    argTypes: {},
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof NotificationBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotificationBannerMobile: Story = {
    args: {
        className: "test",
    },
};
