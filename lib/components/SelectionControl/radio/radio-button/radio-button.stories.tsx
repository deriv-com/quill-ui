import React from "react";
import RadioButton from "./index";

const RadioButtonMeta = {
    title: "Components/Selection control/Radio/RadioButton",
    component: RadioButton,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    args: {
        defaultChecked: true,
        disabled: false,
        hasInfo: false,
        id: "radio-1",
        className: "",
        classNameLabel: "",
        classNameInfo: "",
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
