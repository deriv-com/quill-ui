import React from "react";
import RadioGroup from "./index";
import { fn } from "@storybook/test";

interface RadioGroupProps {
    disabledOption?: boolean;
    hiddenOption?: boolean;
    name?: string;
    onToggle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selected?: string;
    shouldWrapItems?: boolean;
}

const RadioGroupItem = ({
    value = "",
    label = "",
    disabled = false,
    hidden = false,
}) => (
    <RadioGroup.Item
        value={value}
        label={label}
        disabled={disabled}
        hidden={hidden}
    />
);

const Template: React.FC<RadioGroupProps> = (args) => (
    <RadioGroup {...args}>
        <RadioGroupItem value="option1" label="Option 1" />
        <RadioGroupItem
            value="option2"
            label="Option 2"
            disabled={args.disabledOption}
        />
        <RadioGroupItem
            value="option3"
            label="Option 3"
            hidden={args.hiddenOption}
        />
    </RadioGroup>
);

const RadioGroupMeta = {
    title: "Components/Selection Control/Radio/RadioGroup",
    component: RadioGroup,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    args: {
        name: "radioGroup",
        onToggle: fn(),
        selected: "option1",
        shouldWrapItems: false,
    },
    argTypes: {
        name: {
            description:
                "Unique name for the radio group to identify selected radio button.",
        },
        onToggle: {
            description:
                "Callback function triggered when a radio button within the group is toggled.",
            control: { type: "function" },
        },
        selected: {
            description:
                "Pre-selects a specific radio button value by its value prop.",
        },
        shouldWrapItems: {
            description:
                "Controls whether radio buttons within the group wrap to multiple lines.",
            control: { type: "boolean" },
        },
        disabledOption: {
            description: "Disables the second radio button option.",
        },
        hiddenOption: {
            description: "Hides the third radio button option.",
        },
    },
};

export default RadioGroupMeta;

export const BasicRadioGroup = Template.bind({});

export const DisabledOption = Template.bind(this, {
    disabledOption: true,
});

export const HiddenOption = Template.bind(this, {
    hiddenOption: true,
});

export const WrappedItems = Template.bind(this, {
    shouldWrapItems: true,
});
