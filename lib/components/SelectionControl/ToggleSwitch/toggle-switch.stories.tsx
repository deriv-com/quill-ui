import { StoryObj, Meta } from "@storybook/react";
import ToggleSwitch from ".";
import "./toggle-switch.scss";
import { fn } from "@storybook/test";

const meta = {
    title: "Components/Selection control/Toggle Switch",
    component: ToggleSwitch,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    args: {
        defaultChecked: false,
        disabled: false,
        onChange: fn(),
        onFocus: fn(),
        onBlur: fn(),
        wrapperClassName: "",
    },
    argTypes: {
        defaultChecked: {
            table: { type: { summary: "boolean | undefined" } },
            description: "Flag for setting initial state",
            control: { type: "boolean" },
        },
        disabled: {
            table: { type: { summary: "boolean | undefined" } },
            description: "Flag for setting component's disabled state",
            control: { type: "boolean" },
        },
        wrapperClassName: {
            table: { type: { summary: "string | undefined" } },
            description: "ClassName for the switch's wrapper",
            control: { type: "text" },
        },
        id: {
            table: { type: { summary: "string | undefined" } },
            description:
                "Input's ID attribute value, for associating the label",
            control: { type: "text" },
        },
        onChange: {
            table: { type: { summary: "function | undefined" } },
            description:
                "Callback function called when the switch's value changes",
            control: { type: null },
        },
        onFocus: {
            table: { type: { summary: "function | undefined" } },
            description: "Callback function called when the switch gains focus",
            control: { type: null },
        },
        onBlur: {
            table: { type: { summary: "function | undefined" } },
            description: "Callback function called when the switch loses focus",
            control: { type: null },
        },
    },
} satisfies Meta<typeof ToggleSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Enabled: Story = {
    args: {
        disabled: false,
        defaultChecked: false,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultChecked: false,
    },
};

export const Checked: Story = {
    args: {
        disabled: false,
        defaultChecked: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        disabled: true,
        defaultChecked: true,
    },
};
