import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from ".";

import { LabelPairedPlaceholderSmRegularIcon } from "@deriv/quill-icons/LabelPaired";

const meta = {
    title: "Components/Button/Icon Button",
    component: IconButton,
    tags: ["autodocs"],
    args: {
        variant: "primary",
        color: "coral",
        isLoading: false,
        disabled: false,
        type: "button",
        size: "md",
    },

    argTypes: {
        variant: {
            options: ["primary", "secondary", "tertiary"],
            control: { type: "radio" },
        },
        "aria-label": {
            table: {
                disabled: true,
            },
        },
        isLoading: {
            options: ["true", "false"],
            control: { type: "boolean" },
        },
        size: {
            options: ["sm", "md", "lg", "xl"],
            control: { type: "radio" },
        },

        color: {
            options: ["coral", "black", "white", "purchase", "sell"],
            control: { type: "radio" },
        },
        onClick: {
            table: {
                disable: true,
            },
        },
        className: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicPrimaryButton: Story = {
    args: {
        size: "xl",
        children: <LabelPairedPlaceholderSmRegularIcon />,
    },
};
export const BasicSecondaryButton: Story = {
    args: {
        variant: "secondary",
        size: "xl",
        children: <LabelPairedPlaceholderSmRegularIcon />,
    },
};
export const BasicTertiaryButton: Story = {
    args: {
        variant: "tertiary",
        size: "xl",
        children: <LabelPairedPlaceholderSmRegularIcon />,
    },
};

export const ButtonDisabled: Story = {
    args: {
        disabled: true,
        size: "xl",
        children: <LabelPairedPlaceholderSmRegularIcon />,
    },
};
