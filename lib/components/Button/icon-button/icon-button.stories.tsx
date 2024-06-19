import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from ".";

import {
    LabelPairedCircleInfoLgBoldIcon,
    LabelPairedCircleInfoMdBoldIcon,
    LabelPairedCircleInfoSmBoldIcon,
    LabelPairedPlaceholderSmRegularIcon,
    LabelPairedCircleInfoCaptionBoldIcon,
} from "@deriv/quill-icons/LabelPaired";

const icons: Record<string, object | null> = {
    sample_sm: <LabelPairedCircleInfoCaptionBoldIcon />,
    sample_md: <LabelPairedCircleInfoSmBoldIcon />,
    sample_lg: <LabelPairedCircleInfoMdBoldIcon />,
    sample_xl: <LabelPairedCircleInfoLgBoldIcon />,
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
        fullWidth: false,
        type: "button",
        size: "md",
    },
    argTypes: {
        variant: {
            options: ["primary", "secondary", "tertiary"],
            control: { type: "radio" },
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
        iconButton: { table: { disable: true } },
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
        icon: {
            options: Object.keys(icons),
            mapping: icons,
            control: "radio",
        },
    },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryIconButton: Story = {
    args: {
        size: "xl",
        icon: <LabelPairedPlaceholderSmRegularIcon />,
    },
};
export const SecondaryIconButton: Story = {
    args: {
        variant: "secondary",
        size: "xl",
        icon: <LabelPairedPlaceholderSmRegularIcon />,
    },
};
export const TertiaryIconButton: Story = {
    args: {
        variant: "tertiary",
        size: "xl",
        icon: <LabelPairedPlaceholderSmRegularIcon />,
    },
};
