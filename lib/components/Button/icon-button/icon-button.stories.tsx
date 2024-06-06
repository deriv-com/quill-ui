import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from ".";

import {
    LabelPairedPlaceholderSmRegularIcon,
    LabelPairedPlaceholderMdRegularIcon,
    LabelPairedPlaceholderLgRegularIcon,
    LabelPairedPlaceholderXlRegularIcon,
} from "@deriv/quill-icons/LabelPaired";
import { ComponentProps } from "react";

const placeholder = {
    sm: <LabelPairedPlaceholderSmRegularIcon />,
    md: <LabelPairedPlaceholderMdRegularIcon />,
    lg: <LabelPairedPlaceholderLgRegularIcon />,
    xl: <LabelPairedPlaceholderXlRegularIcon />,
};

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
        children: {
            options: Object.keys(placeholder),
            mapping: placeholder,
        },
    },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicPrimaryButton: Story = {
    args: {
        size: "xl",
        children: placeholder["xl"],
    },
};
export const BasicSecondaryButton: Story = {
    args: {
        variant: "secondary",
        size: "xl",
        children: placeholder["xl"],
    },
};
export const BasicTertiaryButton: Story = {
    args: {
        variant: "tertiary",
        size: "xl",
        children: placeholder[meta.args?.size as keyof typeof placeholder],
    },
};

export const ButtonDisabled = (args: ComponentProps<typeof IconButton>) => (
    <IconButton
        children={placeholder[args?.size as keyof typeof placeholder]}
        {...args}
        disabled
    />
);
