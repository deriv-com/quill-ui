import React from "react";
import RadioButton from "./index";
import "./radio-button.stories.scss";

const RadioButtonMeta = {
    title: "Components/Selection Control/Radio/RadioButton",
    component: RadioButton,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    args: {
        className: "",
        classNameInfo: "",
        classNameLabel: "",
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
    description:
        "The RadioButton component is used to create radio button elements for user selection within a group.",
};

export default RadioButtonMeta;

interface RadioButtonProps {
    defaultChecked?: boolean;
    disabled?: boolean;
    hasInfo?: boolean;
    id?: string;
    className?: string;
    classNameLabel?: string;
    classNameInfo?: string;
}

const Template: React.FC<RadioButtonProps> = (args) => (
    <RadioButton {...args}>Option</RadioButton>
);

export const Default = Template.bind({});

export const Unchecked = Template.bind(this, {
    defaultChecked: false,
});

export const CustomClassButton = Template.bind(this, {
    className: "custom-radio",
});

export const CustomLabelClassButton = Template.bind(this, {
    classNameLabel: "custom-label",
});

export const DisabledButton = Template.bind(this, {
    disabled: true,
});

export const ButtonWithInfo = Template.bind(this, {
    hasInfo: true,
});

export const DefaultSmall = Template.bind(this, {
    defaultChecked: true,
    size: "sm",
});

export const UncheckedSmall = Template.bind(this, {
    defaultChecked: false,
    size: "sm",
});

export const DisabledButtonSmall = Template.bind(this, {
    disabled: true,
    size: "sm",
});
