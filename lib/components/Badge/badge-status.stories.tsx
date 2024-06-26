import type { Meta, StoryObj } from "@storybook/react";
import BadgeBase from "./base";

const meta = {
    title: "Components/Badge/Status",
    component: BadgeBase,
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
} satisfies Meta<typeof BadgeBase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SuccessBadge: Story = {
    args: {
        variant: "status",
        size: "sm",
        color: "success",
    },
};
export const warningBadge: Story = {
    args: {
        variant: "status",
        size: "md",
        color: "warning",
    },
};
export const DangerBadge: Story = {
    args: {
        variant: "status",
        size: "lg",
        color: "danger",
    },
};
