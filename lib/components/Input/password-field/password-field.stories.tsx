import { Meta, StoryObj } from "@storybook/react";
import PasswordField from ".";
import { Status, Variants } from "../base";

const placeholder = "Enter password";

const variants: Record<string, Variants> = {
    fill: "fill",
    outline: "outline",
};

const status: Record<string, Status> = {
    neutral: "neutral",
    success: "success",
    error: "error",
};

const message = "Status message goes here";

const meta = {
    title: "Components/Inputs/Password Field",
    component: PasswordField,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        type: "password",
        inputSize: "md",
        status: "neutral",
        disabled: false,
        variant: "fill",
        textAlignment: "left",
        fieldMarker: false,
        required: false,
        showCharacterCounter: false,
    },
    argTypes: {
        type: {
            control: "password",
        },
        inputSize: {
            control: {
                type: "radio",
            },
            options: ["sm", "md"],
        },
        maxLength: {
            control: {
                type: "number",
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
        message: {
            control: {
                type: "text",
            },
        },
    },
} satisfies Meta<typeof PasswordField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultPasswordField: Story = {
    args: {
        placeholder,
    },
};
export const OutlineSuccess: Story = {
    args: {
        placeholder,
        variant: variants.outline,
        status: status.success,
    },
};
export const OutlineError: Story = {
    args: {
        placeholder,
        variant: variants.outline,
        status: status.error,
    },
};
export const FillSuccess: Story = {
    args: {
        placeholder,
        variant: variants.fill,
        status: status.success,
    },
};
export const FillError: Story = {
    args: {
        placeholder,
        variant: variants.fill,
        status: status.error,
    },
};
export const Disabled: Story = {
    args: {
        placeholder,
        disabled: true,
        variant: variants.outline,
    },
};

export const WithLabel: Story = {
    args: {
        placeholder,
        label: "Password",
    },
};

export const LabelledOutlineSuccess: Story = {
    args: {
        placeholder,
        label: "Password",
        variant: variants.outline,
        status: status.success,
    },
};
export const LabelledOutlineError: Story = {
    args: {
        placeholder,
        label: "Password",
        variant: variants.outline,
        status: status.error,
    },
};
export const LabelledFillSuccessWithMessage: Story = {
    args: {
        placeholder,
        label: "Password",
        variant: variants.fill,
        status: status.success,
        message,
    },
};
export const LabelledFillErrorWithMessage: Story = {
    args: {
        placeholder,
        label: "Password",
        variant: variants.fill,
        status: status.error,
        message,
    },
};

export const StatusMessageWithCharacterCounter: Story = {
    args: {
        placeholder,
        variant: variants.outline,
        status: status.error,
        message,
        showCharacterCounter: true,
        maxLength: 15,
    },
};
