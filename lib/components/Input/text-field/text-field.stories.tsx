import { Meta, StoryObj } from "@storybook/react";
import TextField from ".";
import {
    StandaloneCircleCheckBoldIcon,
    StandaloneCircleUserRegularIcon,
    StandalonePlaceholderRegularIcon,
    StandaloneTriangleExclamationBoldIcon,
} from "@deriv/quill-icons";
import { Status, Variants } from "../base";

const icons: Record<string, object | null> = {
    with_icon: <StandalonePlaceholderRegularIcon />,
    none: null,
};

const placeholder = "Placeholder";

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
    title: "Components/Inputs/Text Field",
    component: TextField,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        type: "text",
        inputSize: "md",
        status: "neutral",
        disabled: false,
        variant: "fill",
        textAlignment: "left",
    },
    argTypes: {
        inputSize: {
            control: {
                type: "radio",
            },
            options: ["sm", "md"],
        },
        icon: {
            options: Object.keys(icons),
            mapping: icons,
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
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultTextField: Story = {
    args: {
        placeholder,
    },
};
export const SuccessTextField: Story = {
    args: {
        placeholder,
        variant: variants.outline,
        status: status.success,
    },
};
export const ErrorTextField: Story = {
    args: {
        placeholder,
        variant: variants.outline,
        status: status.error,
    },
};
export const DisabledTextField: Story = {
    args: {
        placeholder,
        disabled: true,
        variant: variants.outline,
    },
};

export const TextFieldWithLabel: Story = {
    args: {
        placeholder,
        label,
    },
};

export const TextFieldWithIconAndLabel: Story = {
    args: {
        placeholder,
        label,
        icon: <StandaloneCircleUserRegularIcon iconSize="sm" />,
    },
};

export const SuccessStatusIconTextField: Story = {
    args: {
        placeholder,
        variant: variants.outline,
        status: status.success,
        statusIcon: <StandaloneCircleCheckBoldIcon iconSize="sm" />,
    },
    argTypes: {
        status: {
            table: {
                disable: true,
            },
        },
    },
};

export const StatusMessageTextField: Story = {
    args: {
        placeholder,
        variant: variants.outline,
        status: status.success,
        leftStatusMessage,
    },
};

export const DoubleStatusMessageTextField: Story = {
    args: {
        placeholder,
        variant: variants.outline,
        status: status.error,
        leftStatusMessage,
        rightStatusMessage,
    },
};

export const SuccessMessageTextFieldWithIcons: Story = {
    args: {
        placeholder,
        variant: variants.outline,
        status: status.success,
        leftStatusMessage,
        rightStatusMessage,
        statusIcon: <StandaloneCircleCheckBoldIcon iconSize="sm" />,
    },
};
export const ErrorMessageTextFieldWithIcons: Story = {
    args: {
        placeholder,
        variant: variants.outline,
        status: status.error,
        leftStatusMessage,
        rightStatusMessage,
        statusIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
    },
};
