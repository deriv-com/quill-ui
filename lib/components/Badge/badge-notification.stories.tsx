import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./base";

const meta = {
    title: "Components/Badge/Notification",
    component: Badge,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        size: {
            options: ["sm", "md", "lg"],
            control: { type: "radio" },
            description: "To select the size of the badge",
        },
        color: {
            options: ["success", "warning", "danger"],
            control: { type: "radio" },
            description: "To select the color of the badge",
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SuccessBadge: Story = {
    args: {
        variant: "notification",
        label: "1",
        size: "sm",
        color: "success",
    },
};
export const warningBadge: Story = {
    args: {
        variant: "notification",
        label: "2",
        size: "md",
        color: "warning",
    },
};
export const DangerBadge: Story = {
    args: {
        variant: "notification",
        label: "3",
        size: "lg",
        color: "danger",
    },
};
