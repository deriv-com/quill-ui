import { Meta, StoryObj } from "@storybook/react";
import TextFieldWithSteppers from ".";
import {
    StandaloneCircleCheckBoldIcon,
    StandaloneCircleUserRegularIcon,
    StandalonePlaceholderRegularIcon,
    StandaloneTriangleExclamationBoldIcon,
} from "@deriv/quill-icons";
import { Status, Variants } from "../base";
import { ComponentProps, useState } from "react";

const icons: Record<string, object | null> = {
    with_icon: <StandalonePlaceholderRegularIcon iconSize="sm" />,
    none: null,
};

const statusIcon: Record<string, object | null> = {
    placeholder: <StandalonePlaceholderRegularIcon iconSize="sm" />,
    success: <StandaloneCircleCheckBoldIcon iconSize="sm" />,
    error: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
    none: null,
};

const variants: Record<string, Variants> = {
    fill: "fill",
    outline: "outline",
};

const status: Record<string, Status> = {
    neutral: "neutral",
    success: "success",
    error: "error",
};

const label = "label";
const leftStatusMessage = "Status message goes here";
const rightStatusMessage = "0/0";

const meta = {
    title: "Components/Inputs/Text Field with Steppers",
    component: TextFieldWithSteppers,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        type: "text",
        inputSize: "md",
        status: "neutral",
        disabled: false,
        variant: "outline",
        textAlignment: "left",
        fieldMarker: false,
        required: false,
        currency: 'USD',
        decimals: 2,
    },
    argTypes: {
        inputSize: {
            control: {
                type: "radio",
            },
            options: ["sm", "md"],
        },
        leftIcon: {
            options: Object.keys(icons),
            mapping: icons,
            control: {
                type: "select",
            },
        },
        rightIcon: {
            options: Object.keys(statusIcon),
            mapping: statusIcon,
            control: {
                type: "select",
            },
        },
        status: {
            control: {
                type: "radio",
            },
            options: ["neutral", "success", "error"],
        },
        variant: {
            control: {
                type: "radio",
            },
            options: ["fill", "outline"],
        },
        label: {
            control: {
                type: "text",
            },
        },
        textAlignment: {
            control: {
                type: "radio",
            },
            options: ["left", "center"],
        },
        leftStatusMessage: {
            control: {
                type: "text",
            },
        },
        rightStatusMessage: {
            control: {
                type: "text",
            },
        },
    },
} satisfies Meta<typeof TextFieldWithSteppers>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: ComponentProps<typeof TextFieldWithSteppers>) => {
    const [value, setValue] = useState();
    return (
        <div style={{ width: "300px" }}>
            <TextFieldWithSteppers
                {...args}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
};

export const DefaultTextField = Template.bind({}) as Story;

export const SuccessTextField = Template.bind({}) as Story;
SuccessTextField.args = {
    variant: variants.outline,
    status: status.success,
    // currency: 'USD',
};

export const ErrorTextField = Template.bind({}) as Story;
ErrorTextField.args = {
    variant: variants.outline,
    status: status.error,
};

export const DisabledTextField = Template.bind({}) as Story;
DisabledTextField.args = {
    disabled: true,
    variant: variants.outline,
};

export const TextFieldWithLabel = Template.bind({}) as Story;
TextFieldWithLabel.args = {
    label,
};

export const TextFieldWithIconAndLabel = Template.bind({}) as Story;
TextFieldWithIconAndLabel.args = {
    label,
    leftIcon: <StandaloneCircleUserRegularIcon iconSize="sm" />,
};

export const SuccessStatusIconTextField = Template.bind({}) as Story;
SuccessStatusIconTextField.args = {
    variant: variants.outline,
    status: status.success,
    rightIcon: <StandaloneCircleCheckBoldIcon iconSize="sm" />,
};

export const StatusMessageTextField = Template.bind({}) as Story;
StatusMessageTextField.args = {
    variant: variants.outline,
    status: status.success,
    leftStatusMessage,
};

export const DoubleStatusMessageTextField = Template.bind({}) as Story;
DoubleStatusMessageTextField.args = {
    variant: variants.outline,
    status: status.error,
    leftStatusMessage,
    rightStatusMessage,
};

export const SuccessMessageTextFieldWithIcons = Template.bind({}) as Story;
SuccessMessageTextFieldWithIcons.args = {
    variant: variants.outline,
    status: status.success,
    leftStatusMessage,
    rightStatusMessage,
    rightIcon: <StandaloneCircleCheckBoldIcon iconSize="sm" />,
};

export const ErrorMessageTextFieldWithIcons = Template.bind({}) as Story;
ErrorMessageTextFieldWithIcons.args = {
    variant: variants.outline,
    status: status.error,
    leftStatusMessage,
    rightStatusMessage,
    rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
};
