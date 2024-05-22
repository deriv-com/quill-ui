import React from "react";
import RadioButton from "./index";
import "./radio-button.stories.scss";
import type { Meta, StoryObj } from "@storybook/react";

const RadioButtonMeta = {
    title: "Components/Selection Control/Radio/RadioButton",
    component: RadioButton,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "The RadioButton component is used to create radio button elements for user selection within a group.",
            },
        },
    },
    tags: ["autodocs"],
    args: {
        className: "",
        classNameInfo: "",
        classNameLabel: "",
        checkboxPosition: "left",
        defaultChecked: true,
        disabled: false,
        hasInfo: false,
        id: "radio-1",
    },
    argTypes: {
        id: {
            description: "Unique identifier for the radio button element.",
        },
        defaultChecked: {
            description: "Sets the initial checked state of the radio button.",
            control: { type: "boolean" },
        },
        disabled: {
            description: "Disables the radio button interaction.",
            control: { type: "boolean" },
        },
        hasInfo: {
            description:
                "Displays informational content next to the radio button.",
            control: { type: "boolean" },
        },
        className: {
            description: "CSS class name applied to the radio button element.",
        },
        classNameLabel: {
            description: "CSS class name applied to the radio button label.",
        },
        classNameInfo: {
            description: "CSS class name applied to the informational content.",
        },
        checkboxPosition: {
            description:
                "Controls left pr right position of the radio button. Default value is 'left'.",
            control: { type: "select" },
            options: ["left", "right"],
        },
        name: {
            description:
                "Unique name for the radio group to identify selected radio button.",
        },
        onChange: {
            description:
                "Callback function that is triggered when the radio button is selected.",
            action: "onChange",
        },
        required: {
            description: "Sets the radio button as a required field.",
            control: { type: "boolean" },
        },
        value: {
            description: "Value of the radio button element.",
        },
        size: {
            description: "Size of the radio button element.",
            control: { type: "select" },
            options: ["sm", "md"],
        },
    },
} satisfies Meta<typeof RadioButton>;

export default RadioButtonMeta;
type Story = StoryObj<typeof RadioButtonMeta>;

const Template: React.FC<React.ComponentProps<typeof RadioButton>> = (args) => (
    <RadioButton {...args}>Option</RadioButton>
);

export const Default = Template.bind(this) as Story;
Default.args = { ...RadioButtonMeta.args };

export const Unchecked = Template.bind(this) as Story;
Unchecked.args = {
    ...RadioButtonMeta.args,
    defaultChecked: false,
};

export const CustomClassButton = Template.bind(this) as Story;
CustomClassButton.args = {
    ...RadioButtonMeta.args,
    className: "custom-radio",
};

export const CustomLabelClassButton = Template.bind(this) as Story;
CustomLabelClassButton.args = {
    ...RadioButtonMeta.args,
    classNameLabel: "custom-label",
};

export const DisabledButton = Template.bind(this) as Story;
DisabledButton.args = {
    ...RadioButtonMeta.args,
    disabled: true,
};

export const ButtonWithInfo = Template.bind(this) as Story;
ButtonWithInfo.args = {
    ...RadioButtonMeta.args,
    hasInfo: true,
};

export const DefaultSmall = Template.bind(this) as Story;
DefaultSmall.args = {
    ...RadioButtonMeta.args,
    defaultChecked: true,
    size: "sm",
};

export const UncheckedSmall = Template.bind(this) as Story;
UncheckedSmall.args = {
    ...RadioButtonMeta.args,
    defaultChecked: false,
    size: "sm",
};

export const DisabledButtonSmall = Template.bind(this) as Story;
DisabledButtonSmall.args = {
    ...RadioButtonMeta.args,
    disabled: true,
    size: "sm",
};

export const ButtonWithRightPosition = Template.bind(this) as Story;
ButtonWithRightPosition.args = {
    ...RadioButtonMeta.args,
    checkboxPosition: "right",
};
