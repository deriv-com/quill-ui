import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LabelPairedPlaceholderCaptionBoldIcon } from "@deriv/quill-icons/LabelPaired";
import { GenericWheelPicker } from ".";
import BreakpointProvider from "@providers/breakpoint/breakpointProvider";
import { StandaloneCircleCheckBoldIcon } from "@deriv/quill-icons";

const icons: Record<string, object | null> = {
    with_icon: <LabelPairedPlaceholderCaptionBoldIcon />,
    none: null,
};

const meta = {
    title: "Components/Inputs/Generic Wheel Picker",
    component: GenericWheelPicker,
    parameters: {
        docs: {
            story: {
                height: "350px",
                width: "350px",
            },
        },
    },
    tags: ["autodocs"],
    args: {
        disabled: false,
        data: [
            [
                { value: "item-1" },
                { value: "item-2" },
                { value: "item-3" },
                { value: "item-4" },
                { value: "item-5" },
                { value: "item-6" },
            ],
            [{ value: "item-1" }, { value: "item-2" }, { value: "item-3" }],
        ],
        actionSheetFooter: {
            primaryAction: {
                content: "Confirm",
                onAction: () => null,
            },
        },
        values: ["item-3", "item-1"],
        status: "neutral",
        placeholder: "Select",
        variant: "fill",
    },
    argTypes: {
        status: {
            options: ["neutral", "success", "error"],
            control: { type: "radio" },
        },
        textAlignment: {
            options: ["left", "center"],
            control: { type: "radio" },
        },
        inputSize: {
            options: ["sm", "md"],
            control: { type: "radio" },
        },
        variant: {
            options: ["fill", "outline"],
            control: { type: "radio" },
        },
        leftIcon: {
            table: { type: { summary: "ReactNode" } },
            control: "radio",
            options: Object.keys(icons),
            mapping: icons,
        },
        rightIcon: {
            table: { type: { summary: "ReactNode" } },
            control: "radio",
            options: Object.keys(icons),
            mapping: icons,
        },
    },
} satisfies Meta<typeof GenericWheelPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

type Template = React.ComponentProps<typeof GenericWheelPicker>;

const Template: React.FC<Template> = ({ ...args }: Template) => {
    return (
        <BreakpointProvider>
            <GenericWheelPicker {...args}></GenericWheelPicker>
        </BreakpointProvider>
    );
};

export const Default = Template.bind(this) as Story;
Default.args = { ...meta.args };

export const DefaultLabellessGenericWheelPicker = Template.bind(this) as Story;
DefaultLabellessGenericWheelPicker.args = {
    status: "success",
    rightIcon: <StandaloneCircleCheckBoldIcon iconSize="sm" />,
    variant: "outline",
};

export const DefaultGenericWheelPickerWithLabel = Template.bind(this) as Story;
DefaultGenericWheelPickerWithLabel.args = {
    label: "Label",
    required: true,
};
