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
        size: "sm",
        label: "Selection control checkbox",
        labelClassName: "",
        name: "demo_checkbox",
        wrapperClassName: "",
        onChange: fn(),
        id: "demo_checkbox",
    },
    argTypes: {
        checked: {
            description: "Flag for setting initial state",
            options: ["true", "false"],
            control: { type: "boolean" },
        },
        disabled: {
            description: "Flag for setting accessibility",
            options: ["true", "false"],
            control: { type: "boolean" },
        },
        size: {
            description: "Size of the label",
            options: ["sm", "md"],
            control: { type: "radio" },
        },
        label: {
            description: "Label content (string or React.Node)",
            control: { type: "text" },
        },
        labelClassName: {
            description:
                "ClassName for label, which will be passed to Text component",
            control: { type: "text" },
        },
        name: {
            description:
                "Input attribute value. Is used as one of the ways to bind input tag with its label",
            control: { type: "text" },
        },
        wrapperClassName: {
            description: "ClassName for external tag of the component",
            control: { type: "text" },
        },
        onChange: {
            description:
                "Callback function, which will be called as a part of onChange and onKeyDown",
            control: { type: null },
        },
        id: {
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

export const CheckboxChecked: Story = {
    args: {
        checked: true,
        label: "Selection control checkbox checked",
    },
};

export const CheckboxUnchecked: Story = {
    args: {
        checked: false,
        label: "Selection control checkbox unchecked",
    },
};

export const CheckboxDisabled: Story = {
    args: {
        disabled: true,
        label: "Selection control checkbox disabled",
    },
};

export const CheckboxSm: Story = {
    args: {
        size: "sm",
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
