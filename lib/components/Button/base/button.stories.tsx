import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";

import {
    LabelPairedPlaceholderSmRegularIcon,
    LabelPairedPlaceholderMdRegularIcon,
    LabelPairedPlaceholderLgRegularIcon,
    LabelPairedPlaceholderXlRegularIcon,
} from "@deriv/quill-icons/LabelPaired";

const iconSizes = {
    sm: LabelPairedPlaceholderSmRegularIcon,
    md: LabelPairedPlaceholderMdRegularIcon,
    lg: LabelPairedPlaceholderLgRegularIcon,
    xl: LabelPairedPlaceholderXlRegularIcon,
};

const meta = {
    title: "Components/Button/Basic",
    component: Button,
    parameters: {
        layout: "centered",
        docs: {
            story: {
                height: "350px",
                width: "350px",
            },
        },
    },
    tags: ["autodocs"],
    args: {
        variant: "primary",
        label: "Label",
        color: "coral",
        isLoading: false,
        disabled: false,
        fullWidth: false,
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
                disable: true,
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
        icon: {
            description: "Icon to display on the left side of the chip",
            options: Object.keys(iconSizes),
            mapping: iconSizes,
            control: {
                type: "select",
            },
        },
        className: {
            table: {
                disable: true,
            },
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicPrimaryButton: Story = {
    args: {
        size: "xl",
        label: "Basic Primary Button",
    },
};
export const BasicSecondaryButton: Story = {
    args: {
        variant: "secondary",
        size: "xl",
        label: "Basic Secondary Button",
    },
};
export const BasicTertiaryButton: Story = {
    args: {
        variant: "tertiary",
        size: "xl",
        label: "Basic Teritary Button",
    },
};

export const ButtonWithLabelIconAtStart: Story = {
    args: {
        size: "lg",
        icon: LabelPairedPlaceholderMdRegularIcon,
        iconPosition: "start",
    },
};
export const ButtonWithLabelIconAtEnd: Story = {
    args: {
        size: "lg",
        icon: LabelPairedPlaceholderMdRegularIcon,
        iconPosition: "end",
    },
};
