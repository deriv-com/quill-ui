import type { Meta, StoryObj } from "@storybook/react";
import { LabelPairedPlaceholderSmRegularIcon } from "@deriv/quill-icons/LabelPaired";
import "./custom-tag-stories.scss";

import Tag from ".";
const meta = {
    title: "Components/Tag/Custom",
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
    },
    argTypes: {
        label: {
            name: "Label",
            control: "text",
        },
        icon: {
            table: {
                disable: true,
            },
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

export const CustomTagFillWithIcon: Story = {
    args: {
        variant: "custom",
        icon: LabelPairedPlaceholderSmRegularIcon,
        className: "custom-tag",
        iconClassName: "custom-tag-icon",
    },
};

export const CustomTagWithoutIcon: Story = {
    args: {
        variant: "custom",
        color: "custom",
        className: "custom-tag-without-icon-fill",
        isBold: false,
        size: "lg",
    },
};

export const CustomTagOutlineWithoutIcon: Story = {
    args: {
        variant: "outline",
        icon: LabelPairedPlaceholderSmRegularIcon,
        className: "custom-tag-without-icon-outline",
        iconClassName: "custom-tag-without-icon-outline-icon",
        isBold: false,
        size: "sm",
    },
};
