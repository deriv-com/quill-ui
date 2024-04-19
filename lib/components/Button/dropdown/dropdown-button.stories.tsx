import type { Meta, StoryObj } from "@storybook/react";
import { DropdownButton } from ".";

const meta = {
    title: "Components/Button/Dropdown",
    component: DropdownButton,
    parameters: {
        docs: {
            story: {
                height: "350px",
                width: "350px",
            },
        },
    },

    args: {
        defaultOption: { value: "", label: "Dropdown menu" },
        disabled: false,
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
        className: {
            table: {
                disable: true,
            },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof DropdownButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownMenu: Story = {
    args: {
        size: "md",
        options: [
            { value: "1", label: "Sample Item 1" },
            {
                value: "2",
                label: "Sample Item 2",
            },
            { value: "3", label: "Sample Item 3" },
            { value: "4", label: "Sample Item 4" },
            { value: "1", label: "Sample Item 1" },
            {
                value: "2",
                label: "Sample Item 2",
            },
            { value: "3", label: "Sample Item 3" },
            { value: "4", label: "Sample Item 4" },
            { value: "1", label: "Sample Item 1" },
            {
                value: "2",
                label: "Sample Item 2",
            },
            { value: "3", label: "Sample Item 3" },
            { value: "4", label: "Sample Item 4" },
        ],
    },
};
