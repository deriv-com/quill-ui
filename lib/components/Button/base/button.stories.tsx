import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";

import {
    LabelPairedPlaceholderSmRegularIcon,
    LabelPairedPlaceholderMdRegularIcon,
    LabelPairedPlaceholderLgRegularIcon,
    LabelPairedPlaceholderXlRegularIcon,
    LabelPairedChevronDownSmRegularIcon,
    LabelPairedChevronDownMdRegularIcon,
    LabelPairedChevronDownLgRegularIcon,
    LabelPairedChevronDownXlRegularIcon,
} from "@deriv/quill-icons/LabelPaired";

const meta = {
    title: "Components/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        variant: "primary",
        label: "Label",
        color: "coral",
        isLoading: false,
        disabled: false,
        size: "md",
        isFullWidth: false,
        type: "button",
        isDropDownMenu: true,
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

const iconSizes = {
    sm: LabelPairedPlaceholderSmRegularIcon,
    md: LabelPairedPlaceholderMdRegularIcon,
    lg: LabelPairedPlaceholderLgRegularIcon,
    xl: LabelPairedPlaceholderXlRegularIcon,
};
const chevronIconSizes = {
    sm: LabelPairedChevronDownSmRegularIcon,
    md: LabelPairedChevronDownMdRegularIcon,
    lg: LabelPairedChevronDownLgRegularIcon,
    xl: LabelPairedChevronDownXlRegularIcon,
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
    args: {
        icon: LabelPairedPlaceholderXlRegularIcon,
        chevronIcon: LabelPairedChevronDownXlRegularIcon,
    },
};
