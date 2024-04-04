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
            description: "Setting the switch state from outside the component and manage it outside, It enforces whichever state is coming",
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

export const Default: Story = {
    args: {
        disabled: false,
        defaultChecked: false,
    },
};

export const DefaultOn: Story = {
    args: {
        disabled: false,
        defaultChecked: true,
    },
    name:'Checked (DefaultChecked is true)'
};

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultChecked: false,
    },
};

export const DisabledOn: Story = {
    args: {
        disabled: true,
        defaultChecked: true,
    },
};

export const Checked_StayAlwaysChecked: Story = {
    args: {
        checked:true,
        disabled: false,
    },
    name:'Checked (Stay Always Checked)'
};