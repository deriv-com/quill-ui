import type { Meta, StoryObj } from "@storybook/react";
import Tag from "@components/Tag";

const meta = {
    title: "Components/Tag/Preset",
    component: Tag,
    parameters: {
        layout: "centered",
    },
    args: {
        label: "Custom",
        size: "md",
        isBold: true,
        variant: "custom",
        color: "custom",
        showIcon: true,
    },
    argTypes: {
        label: {
            name: "Label",
            control: "text",
        },
        size: {
            options: ["xs", "sm", "md", "lg"],
            control: { type: "radio" },
            description: "To select the size of icon and font-size",
        },
        variant: {
            options: ["fill", "outline"],
            control: { type: "radio" },
            description: "To select the variant of the tag",
        },
        icon: {
            table: {
                disable: true,
            },
        },
        showIcon: {
            ontrol: { type: "radio" },
            description: "To display/ hide tag icon",
        },
        className: {
            name: "Class Name",
            control: "text",
        },
        iconClassName: {
            table: {
                disable: true,
            },
        },
        isBold: {
            control: "boolean",
        },
        color: {
            table: {
                disable: true,
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ErrorTagFill: Story = {
    args: {
        color: "error",
        variant: "fill",
    },
};

export const WarningTagFill: Story = {
    args: {
        color: "warning",
        variant: "fill",
        label: "Warning",
    },
};

export const SuccessTagFill: Story = {
    args: {
        color: "success",
        variant: "fill",
        label: "Success",
    },
};

export const InfoTagFill: Story = {
    args: {
        color: "info",
        variant: "fill",
        label: "Info",
    },
};

export const WarningTagOutline: Story = {
    args: {
        color: "warning",
        variant: "outline",
        label: "Warning",
    },
};

export const SuccessTagOutline: Story = {
    args: {
        color: "success",
        variant: "outline",
        label: "Success",
    },
};

export const ErrorTagOutline: Story = {
    args: {
        color: "error",
        variant: "outline",
        label: "Error",
    },
};

export const InfoTagOutline: Story = {
    args: {
        color: "info",
        variant: "outline",
        label: "Info",
    },
};
