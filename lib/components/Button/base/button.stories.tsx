import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";

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

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
    args: {},
};
