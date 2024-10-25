import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import "@deriv-com/quill-tokens/dist/quill.css";
import VerticalStepper from "./index";
import { LabelPairedCheckMdFillIcon } from "@deriv/quill-icons";

const icons: Record<string, object | null> = {
    with_icon: <LabelPairedCheckMdFillIcon />,
    none: null,
};

const meta: Meta<typeof VerticalStepper> = {
    title: "Components/Stepper/VerticalStepper",
    component: VerticalStepper,
    argTypes: {
        size: {
            options: ["sm", "md", "lg"],
            control: "radio",
            description: "To select the size of the stepper",
        },
        currentStep: {
            control: "number",
            description: "To select current step of the stepper",
        },
        labels: {
            options: ["Step 1", "Step 2", "Step 3"],
            control: {
                type: "object",
            },
            description: "To select the labels of the stepper",
        },
        Icon: {
            options: Object.keys(icons),
            mapping: icons,
            control: {
                type: "radio",
            },
            description: "To choose the icon of the stepper",
        },
        lineSize: {
            options: ["sm", "md"],
            control: "radio",
            description: "To select the line size of the stepper",
        },
    },
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        currentStep: 0,
        labels: ["Default", "Step 1", "Step 2"],
        size: "md",
        lineSize: "md",
    },
};

export const OneStepCompleted: Story = {
    args: {
        currentStep: 1,
        labels: ["Default", "Step 1", "Step 2"],
        size: "md",
        lineSize: "md",
    },
};

export const AllStepsCompleted: Story = {
    args: {
        currentStep: 2,
        labels: ["Default", "Step 1", "Step 2"],
        size: "md",
        lineSize: "md",
    },
};

const commonProps = {
    currentStep: 1,
    labels: ["Default", "Step 1", "Step 2"],
};

export const SmallSize: Story = {
    render: () => <VerticalStepper {...commonProps} size="sm" lineSize="sm" />,
};

export const MiddleSize: Story = {
    render: () => <VerticalStepper {...commonProps} />,
};

export const LargeSize: Story = {
    render: () => <VerticalStepper {...commonProps} size="lg" />,
};
