import React from "react";
import RadioGroup from "./index";
import { fn } from "@storybook/test";
import { TMediumSizes, TLeftOrRight } from "@types";

interface RadioGroupProps {
    disabledOption?: boolean;
    hiddenOption?: boolean;
    name?: string;
    onToggle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selected?: string | number;
    shouldWrapItems?: boolean;
    size?: TMediumSizes;
    radioButtonPosition?: TLeftOrRight;
}

const RadioGroupItem = ({
    value = "",
    label = "",
    radioButtonPosition = "left" as TLeftOrRight,
    disabled = false,
    hidden = false,
}) => (
    <RadioGroup.Item
        value={value}
        label={label}
        disabled={disabled}
        hidden={hidden}
        radioButtonPosition={radioButtonPosition}
    />
);

const items: Record<string, string | null> = {
    "Option 1": "option1",
    "Option 2": "option2",
    "Option 3": "option3",
};

const Template: React.FC<RadioGroupProps> = (args) => (
    <RadioGroup {...args}>
        <RadioGroupItem
            value="option1"
            label="Option 1"
            radioButtonPosition={args.radioButtonPosition}
        />
        <RadioGroupItem
            value="option2"
            label="Option 2"
            disabled={args.disabledOption}
            radioButtonPosition={args.radioButtonPosition}
        />
        <RadioGroupItem
            value="option3"
            label="Option 3"
            hidden={args.hiddenOption}
            radioButtonPosition={args.radioButtonPosition}
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
        required: false,
    },
    argTypes: {
        name: {
            description:
                "Unique name for the radio group to identify selected radio button.",
            control: false,
        },
        onToggle: {
            description:
                "Callback function triggered when a radio button within the group is toggled.",
            control: { type: "function" },
        },
        selected: {
            description:
                "Pre-selects a specific radio button value by its value prop.",
            options: Object.keys(items),
            mapping: items,
            control: "radio",
        },
        size: {
            description: "Size of the radio button elements.",
            control: "radio",
            options: ["sm", "md"],
        },
        shouldWrapItems: {
            description:
                "Controls whether radio buttons within the group wrap to multiple lines.",
            control: { type: "boolean" },
        },
        className: {
            description: "CSS class name applied to the radio group element.",
            control: false,
        },
        required: {
            description: "Sets the radio group as a required field.",
            control: { type: "boolean" },
        },
        radioButtonPosition: {
            description:
                "Controls left or right position of the radio button. Default value is 'left'.",
            control: "radio",
            options: ["left", "right"],
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

export const RadioGroupRight = Template.bind(this, {
    radioButtonPosition: "right",
});
