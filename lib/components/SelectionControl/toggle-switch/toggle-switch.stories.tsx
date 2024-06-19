import { StoryObj, Meta } from "@storybook/react";
import ToggleSwitch from ".";
import "./toggle-switch.scss";
import { fn } from "@storybook/test";

const meta = {
    title: "Components/Selection Control/Toggle Switch",
    component: ToggleSwitch,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    args: {
        defaultChecked: false,
        disabled: false,
        onChange: fn(),
        onFocus: fn(),
        onBlur: fn(),
        className: "",
    },
    argTypes: {
        defaultChecked: {
            table: { type: { summary: "boolean | undefined" } },
            description: "Flag for setting initial state",
            control: { type: "boolean" },
        },
        checked: {
            table: { type: { summary: "boolean | undefined" } },
            description:
                "Setting the switch state from outside the component and manage it outside, It enforces whichever state is coming",
            control: { type: "boolean" },
        },
        disabled: {
            table: { type: { summary: "boolean | undefined" } },
            description: "Flag for setting component's disabled state",
            control: { type: "boolean" },
        },
        className: {
            table: { type: { summary: "string | undefined" } },
            description: "ClassName for the switch's wrapper",
            control: false,
        },
        id: {
            table: { type: { summary: "string | undefined" } },
            description:
                "Input's ID attribute value, for associating the label",
            control: false,
        },
        onChange: {
            table: { type: { summary: "function | undefined" } },
            description:
                "Callback function called when the switch's value changes",
            control: false,
        },
        onFocus: {
            table: { type: { summary: "function | undefined" } },
            description: "Callback function called when the switch gains focus",
            control: false,
        },
        onBlur: {
            table: { type: { summary: "function | undefined" } },
            description: "Callback function called when the switch loses focus",
            control: false,
        },
    },
} satisfies Meta<typeof ToggleSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const DefaultOn: Story = {
    args: {
        defaultChecked: true,
    },
    name: "Checked (DefaultChecked is true)",
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const DisabledOn: Story = {
    args: {
        disabled: true,
        defaultChecked: true,
    },
};

export const CheckedStaysAlwaysChecked: Story = {
    args: {
        checked: true,
    },
    name: "Checked (Stay Always Checked)",
};
