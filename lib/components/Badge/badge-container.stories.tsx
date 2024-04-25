import type { Meta, StoryObj } from "@storybook/react";
import BadgeContainer from "./index";
import { LabelPairedBellXlRegularIcon } from "@deriv/quill-icons/LabelPaired";
import { StandaloneWhatsappIcon } from "@deriv/quill-icons/Standalone";
import { TextField } from "..";

const meta = {
    title: "Components/Badge/Conatiner",
    component: BadgeContainer,
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
} satisfies Meta<typeof BadgeContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotificationOnTop: Story = {
    args: {
        children: <LabelPairedBellXlRegularIcon />,
        variant: "notification",
        label: "3",
        size: "sm",
        color: "danger",
        position: "top-right",
    },
};

export const StatusOnBottom: Story = {
    args: {
        variant: "status",
        position: "bottom-right",
        children: <StandaloneWhatsappIcon fill="#000000" iconSize="xl" />,
        size: "sm",
        color: "success",
    },
};
export const NotificationAtCenter: Story = {
    args: {
        children: <TextField placeholder="Notification"></TextField>,
        variant: "notification",
        position: "center",
        size: "md",
        label: "10",
        color: "danger",
    },
};
