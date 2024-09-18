import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LabelPairedPlaceholderCaptionBoldIcon } from "@deriv/quill-icons/LabelPaired";
import { TimeWheelPicker } from ".";
import BreakpointProvider from "@providers/breakpoint/breakpointProvider";
import { StandaloneCircleCheckBoldIcon } from "@deriv/quill-icons";
import { TimeWheelPickerContainer } from "@components/Atom";

const icons: Record<string, object | null> = {
    with_icon: <LabelPairedPlaceholderCaptionBoldIcon />,
    none: null,
};

const meta = {
    title: "Components/Inputs/Time Wheel Picker",
    component: TimeWheelPicker,
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
        actionSheetFooter: {
            primaryAction: {
                content: "Confirm",
                onAction: () => null,
            },
        },
        status: "neutral",
        placeholder: "Select",
        variant: "fill",
        container: TimeWheelPickerContainer,
        locale: "en",
        is12Hour: true,
        startTimeIn24Format: "00:00",
        selectedTime: "1:00",
        wheelType: "Time",
        minutesInterval: 1,
        hoursInterval: 1,
        inputSize: "lg",
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
            options: ["sm", "md", "lg"],
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
} satisfies Meta<typeof TimeWheelPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

type Template = React.ComponentProps<typeof TimeWheelPicker>;

const Template: React.FC<Template> = ({ ...args }: Template) => {
    return (
        <BreakpointProvider>
            <TimeWheelPicker {...args}></TimeWheelPicker>
        </BreakpointProvider>
    );
};

export const Default = Template.bind(this) as Story;
Default.args = { ...meta.args };

export const Default12HourTimeWheelPicker = Template.bind(this) as Story;
Default12HourTimeWheelPicker.args = {
    status: "neutral",
    rightIcon: <StandaloneCircleCheckBoldIcon iconSize="sm" />,
    variant: "outline",
};

export const Default24HourTimeWheelPicker = Template.bind(this) as Story;
Default24HourTimeWheelPicker.args = {
    status: "neutral",
    rightIcon: <StandaloneCircleCheckBoldIcon iconSize="sm" />,
    variant: "outline",
    is12Hour: false,
    startTimeIn24Format: "00:00",
};
