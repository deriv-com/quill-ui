import React from "react";
import RadioGroup from "./index";
import { fn } from "@storybook/test";
import { TMediumSizes, TLeftOrRight } from "@types";

interface RadioGroupProps {
    disabledOption?: boolean;
    hiddenOption?: boolean;
    name?: string;
    onToggle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selected?: string;
    shouldWrapItems?: boolean;
    size?: TMediumSizes;
}

const RadioGroupItem = ({
    value = "",
    label = "",
    checkboxPosition = "left" as TLeftOrRight,
    disabled = false,
    hidden = false,
}) => (
    <RadioGroup.Item
        value={value}
        label={label}
        disabled={disabled}
        hidden={hidden}
        checkboxPosition={checkboxPosition}
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
        size: {
            description: "Size of the radio button elements.",
            control: { type: "select" },
            options: ["sm", "md"],
        },
        shouldWrapItems: {
            description:
                "Controls whether radio buttons within the group wrap to multiple lines.",
            control: { type: "boolean" },
        },
        className: {
            description: "CSS class name applied to the radio group element.",
        },
        required: {
            description: "Sets the radio group as a required field.",
            control: { type: "boolean" },
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

export const CustomOnToggleCallback = Template.bind(this, {
    onToggle: (e) => {
        alert(`Selected option: ${e.target.value}`);
    },
});

export const BasicRadioGroupSmall = Template.bind(this, {
    size: "sm",
});
