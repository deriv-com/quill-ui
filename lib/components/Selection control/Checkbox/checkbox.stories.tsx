import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import { Checkbox } from "./index";

const meta = {
    title: "Components/Selection control/Checkbox",
    component: Checkbox,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    args: {
        checked: false,
        disabled: false,
        indeterminate: false,
        isLabelPaired: false,
        size: "sm",
        label: "Selection control checkbox",
        name: "demo_checkbox",
        onChange: fn(),
        id: "demo_checkbox",
    },
    argTypes: {
        checked: {
            table: { type: { summary: "boolean | undefined" } },
            description: "Flag for setting initial state",
            options: ["true", "false"],
            control: { type: "boolean" },
        },
        disabled: {
            table: { type: { summary: "boolean | undefined" } },
            description: "Flag for setting accessibility",
            options: ["true", "false"],
            control: { type: "boolean" },
        },
        indeterminate: {
            table: { type: { summary: "boolean | undefined" } },
            description: "Flag for setting indeterminate state",
            options: ["true", "false"],
            control: { type: "boolean" },
        },
        isLabelPaired: {
            table: { type: { summary: "boolean | undefined" } },
            description: "Flag for adding info icon",
            options: ["true", "false"],
            control: { type: "boolean" },
        },
        size: {
            table: { type: { summary: "string | undefined" } },
            description: "Size of the label and info icon",
            options: ["sm", "md"],
            control: { type: "radio" },
        },
        label: {
            table: { type: { summary: "string | React.Node" } },
            description: "Label content (string or React.Node)",
            control: { type: "text" },
        },
        labelClassName: {
            table: { type: { summary: "string | undefined" } },
            description:
                "ClassName for label, which will be passed to Text component",
            control: { type: "text" },
        },
        name: {
            table: { type: { summary: "string | undefined" } },
            description:
                "Input attribute value. Is used as one of the ways to bind input tag with its label",
            control: { type: "text" },
        },
        wrapperClassName: {
            table: { type: { summary: "string | undefined" } },
            description: "ClassName for external tag of the component",
            control: { type: "text" },
        },
        onChange: {
            table: { type: { summary: "function | undefined" } },
            description:
                "Callback function, which will be called as a part of onChange and onKeyDown",
            control: { type: null },
        },
        id: {
            table: { type: { summary: "string | undefined" } },
            description:
                "Input attribute value. Is used as one of the ways to bind input tag with its label",
            control: { type: "text" },
        },
        ref: {
            description: "Reference for direct manipulations",
            control: { type: null },
        },
    },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckboxUnchecked: Story = {
    args: {
        label: "Selection control checkbox",
    },
};

export const CheckboxChecked: Story = {
    args: {
        checked: true,
        label: "Selection control checkbox checked",
    },
};

export const CheckboxIndeterminate: Story = {
    args: {
        indeterminate: true,
        label: "Selection control checkbox indeterminate",
    },
};

export const CheckboxDisabled: Story = {
    args: {
        disabled: true,
        label: "Selection control checkbox disabled",
    },
};

export const CheckboxDisabledChecked: Story = {
    args: {
        checked: true,
        disabled: true,
        label: "Selection control checkbox disabled and checked",
    },
};

export const CheckboxWithInfoIconSm: Story = {
    args: {
        isLabelPaired: true,
        label: "Selection control checkbox with info icon sm",
    },
};

export const CheckboxWithInfoIconMd: Story = {
    args: {
        isLabelPaired: true,
        size: "md",
        label: "Selection control checkbox with info icon md",
    },
};

export const CheckboxSm: Story = {
    args: {
        label: "Selection control checkbox sm size",
    },
};

export const CheckboxMd: Story = {
    args: {
        size: "md",
        label: "Selection control checkbox md size",
    },
};

export const CheckboxInteractions: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const checkbox = canvas.getByRole("checkbox");

        await expect(checkbox).not.toBeChecked();

        // 👇 Simulate interactions with the component
        await userEvent.hover(checkbox);
        await userEvent.click(checkbox);
        await expect(checkbox).toBeChecked();

        await userEvent.click(checkbox);
        await expect(checkbox).not.toBeChecked();

        await userEvent.keyboard("[Enter]");
        await expect(checkbox).toBeChecked();
    },
};
