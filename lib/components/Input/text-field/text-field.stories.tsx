import { Meta, StoryObj } from "@storybook/react";
import TextField from ".";
import {
    StandaloneCircleCheckBoldIcon,
    StandaloneCircleUserRegularIcon,
    StandaloneTriangleExclamationBoldIcon,
} from "@deriv/quill-icons";

const placeholder = "Placeholder";

const variants = {
    FILL: "fill",
    OUTLINE: "outline",
};

const status = {
    NEUTRAL: "neutral",
    SUCCESS: "success",
    ERROR: "error",
};

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
        placeholder: "Placeholder",
    },
};
export const SuccessTextField: Story = {
    args: {
        placeholder: "Placeholder",
        variant: "outline",
        status: "success",
    },
};
export const ErrorTextField: Story = {
    args: {
        placeholder: "Placeholder",
        variant: "outline",
        status: "error",
    },
};
export const DisabledTextField: Story = {
    args: {
        placeholder: "Placeholder",
        disabled: true,
        variant: "outline",
    },
};

export const TextFieldWithLabel: Story = {
    args: {
        placeholder: "Placeholder",
        label: "Label",
    },
};

export const TextFieldWithIconAndLabel: Story = {
    args: {
        placeholder: "Placeholder",
        label: "Label",
        icon: <StandaloneCircleUserRegularIcon iconSize="sm" />,
    },
};

export const SuccessStatusIconTextField: Story = {
    args: {
        placeholder: "Placeholder",
        variant: "outline",
        status: "success",
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
        placeholder: "Placeholder",
        variant: "outline",
        status: "success",
        leftStatusMessage: "Status message goes here",
    },
};

export const DoubleStatusMessageTextField: Story = {
    args: {
        placeholder,
        // variants.OUTLINE,
        // status.ERROR,
        leftStatusMessage,
        rightStatusMessage,
    },
};

export const SuccessMessageTextFieldWithIcons: Story = {
    args: {
        placeholder: "Placeholder",
        variant: "outline",
        status: "success",
        leftStatusMessage: "Status message goes here",
        rightStatusMessage: "0/0",
        statusIcon: <StandaloneCircleCheckBoldIcon iconSize="sm" />,
    },
};
export const ErrorMessageTextFieldWithIcons: Story = {
    args: {
        placeholder: "Placeholder",
        variant: "outline",
        status: "error",
        leftStatusMessage: "Status message goes here",
        rightStatusMessage: "0/0",
        statusIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
    },
};
