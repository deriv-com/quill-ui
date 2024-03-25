import type { Meta, StoryObj } from "@storybook/react";
// import { Ref } from "react";
import { Checkbox } from "./index";

const meta = {
    title: "Components/Selection control/Checkbox",
    component: Checkbox,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    args: {
        checked: false,
        disabled: false,
        label: "Selection control checkbox",
        labelClassName: "",
        name: "demo_checkbox",
        wrapperClassName: "",
        onChange: () => {},
        id: "demo_checkbox",
        // ref: Ref,
    },
    argTypes: {
        checked: {
            options: ["true", "false"],
            control: { type: "boolean" },
        },
        disabled: {
            options: ["true", "false"],
            control: { type: "boolean" },
        },
        label: { control: { type: "text" } },
        labelClassName: { control: { type: "text" } },
        name: {
            description: "Used to bind label with checkbox.",
            control: { type: "text" },
        },
        wrapperClassName: { control: { type: "text" } },
        onChange: {
            description:
                "Callback function for user interaction with checkbox.",
            control: false,
        },
        id: {
            description: "Used to bind label with checkbox.",
            control: { type: "text" },
        },
        ref: {
            description: "Used as one of possible ways to control the element.",
            control: false,
        },
    },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectionControlCheckbox: Story = {
    args: {
        checked: false,
        disabled: false,
        label: "Selection control checkbox",
    },
};
