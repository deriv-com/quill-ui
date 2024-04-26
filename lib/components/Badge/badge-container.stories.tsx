import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./index";
import { StandaloneBellRegularIcon } from "@deriv/quill-icons/Standalone";
import { TextField } from "@components/Input";

const meta = {
    title: "Components/Badge/Container",
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
const imageSRC =
    "https://www.clipartmax.com/png/small/344-3442642_clip-art-freeuse-library-profile-man-user-people-icon-icono-de-login.png";

export const NotificationOnTopSmallIcon: Story = {
    args: {
        children: <StandaloneBellRegularIcon iconSize="sm" />,
        variant: "notification",
        label: "6",
        size: "sm",
        color: "danger",
        position: "top-right",
    },
};
export const NotificationOnTopMediumIcon: Story = {
    args: {
        children: <StandaloneBellRegularIcon fill="#000000" iconSize="md" />,
        variant: "notification",
        label: "6",
        size: "sm",
        contentSize: "md",
        color: "danger",
        position: "top-right",
    },
};
export const NotificationOnTopLargeIcon: Story = {
    args: {
        children: <StandaloneBellRegularIcon fill="#000000" iconSize="2xl" />,
        variant: "notification",
        label: "6",
        size: "lg",
        contentSize: "2xl",
        color: "danger",
        position: "top-right",
    },
};
export const StatusOnBottomSmallContent: Story = {
    args: {
        variant: "status",
        position: "bottom-right",
        children: (
            <img
                src={imageSRC}
                width={26}
                height={26}
                alt="Notification small"
            />
        ),
        size: "sm",
        color: "success",
    },
};
export const StatusOnBottomMedimContent: Story = {
    args: {
        variant: "status",
        position: "bottom-right",
        children: (
            <img
                src={imageSRC}
                width={56}
                height={56}
                alt="Notification medium"
            />
        ),
        size: "md",
        color: "success",
    },
};
export const StatusOnBottomLargeContent: Story = {
    args: {
        variant: "status",
        position: "bottom-right",
        children: (
            <img
                src={imageSRC}
                width={111}
                height={111}
                alt="Notification large"
            />
        ),
        size: "lg",
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
