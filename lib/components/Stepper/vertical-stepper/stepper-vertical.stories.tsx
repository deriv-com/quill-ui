import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import "@deriv-com/quill-tokens/dist/quill.css";
import Stepper from "../index";
import { Steps } from "../types";
import { LabelPairedCheckMdFillIcon } from "@deriv/quill-icons";

const icons: Record<string, object | null> = {
    with_icon: <LabelPairedCheckMdFillIcon />,
    none: null,
};
const stepsArray = Object.values(Steps).filter((value) => typeof value === "number");

const meta: Meta<typeof Stepper.Vertical> = {
    title: "Components/Stepper/VerticalStepper",
    component: Stepper.Vertical,
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
        allSteps: {
            options: stepsArray,
            control: {
                type: "object",
            },
            description: "To pass the all steps for the stepper",
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
            options: ["sm", "md", "lg"],
            control: "radio",
            description: "To select the line size of the stepper",
        }
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
        labels: ['Step 1', 'Step 2', 'Step 3'],
        allSteps: stepsArray,
        size: "md",
        lineSize: "md",
    },
};

export const OneStepCompleted: Story = {
    args: {
        currentStep: 1,
        labels: ['Step 1', 'Step 2', 'Step 3'],
        allSteps: stepsArray,
        size: "md",
        lineSize: "md",
    },
};

export const AllStepsCompleted: Story = {
    args: {
        currentStep: 2,
        labels: ['Step 1', 'Step 2', 'Step 3'],
        allSteps: stepsArray,
        size: "md",
        lineSize: "md",
    },
};

const commonProps = {
    currentStep: 1 as Steps,
    labels: ['Step 1', 'Step 2', 'Step 3'],
    allSteps: stepsArray,
};

export const SmallSize: Story = {
    render: () => (<Stepper.Vertical {...commonProps} size="sm" />),
};

export const MiddleSize: Story = {
    render: () => (<Stepper.Vertical {...commonProps} />),
};

export const LargeSize: Story = {
    render: () => (<Stepper.Vertical {...commonProps} size="lg" lineSize="lg" />),
};

