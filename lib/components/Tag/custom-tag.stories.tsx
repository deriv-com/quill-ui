import type { Meta, StoryObj } from "@storybook/react";
import {
    LabelPairedPlaceholderSmRegularIcon,
    LabelPairedThumbsUpCaptionFillIcon,
} from "@deriv/quill-icons/LabelPaired";
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
        size: {
            options: ["xs", "sm", "md", "lg"],
            control: { type: "radio" },
            description: "To select the size of icon and font-size",
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
        icon: <LabelPairedPlaceholderSmRegularIcon />,
        className: "custom-tag",
        iconClassName: "custom-tag-icon",
    },
};
export const CustomTagWithIcon: Story = {
    args: {
        variant: "custom",
        icon: <LabelPairedThumbsUpCaptionFillIcon />,
        className: "custom-tag-outline",
        label: "Best seller",
        iconClassName: "custom-tag-outline-icon",
        size: "lg",
    },
};

export const CustomTagWithoutIcon: Story = {
    args: {
        variant: "custom",
        className: "custom-tag-without-icon-outline",
        isBold: false,
        size: "md",
    },
};
