import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";

import {
    LabelPairedPlaceholderSmRegularIcon,
    LabelPairedPlaceholderMdRegularIcon,
    LabelPairedPlaceholderLgRegularIcon,
    LabelPairedPlaceholderXlRegularIcon,
} from "@deriv/quill-icons/LabelPaired";
import { ComponentProps } from "react";

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
const placeholder = {
    sm: <LabelPairedPlaceholderSmRegularIcon />,
    md: <LabelPairedPlaceholderMdRegularIcon />,
    lg: <LabelPairedPlaceholderLgRegularIcon />,
    xl: <LabelPairedPlaceholderXlRegularIcon />,
};

export const ButtonWithLabelIconAtStart = (
    args: ComponentProps<typeof Button>,
) => (
    <Button
        {...args}
        size="lg"
        iconPosition="start"
        icon={placeholder[args?.size as keyof typeof placeholder]}
    />
);
export const ButtonWithLabelIconAtEnd = (
    args: ComponentProps<typeof Button>,
) => (
    <Button
        {...args}
        size="lg"
        iconPosition="end"
        icon={placeholder[args?.size as keyof typeof placeholder]}
    />
);
