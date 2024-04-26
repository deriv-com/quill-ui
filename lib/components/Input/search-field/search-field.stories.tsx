import { Meta, StoryObj } from "@storybook/react";
import SearchField from ".";
import { Status, Variants } from "../base";
import { StandaloneCircleXmarkFillIcon } from "@deriv/quill-icons";
import { ChangeEvent, useState } from "react";

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

const leftStatusMessage = "Status message goes here";

const meta = {
    title: "Components/Inputs/Search Field",
    component: SearchField,
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
        triggerActionIcon: (
            <StandaloneCircleXmarkFillIcon
                fill="var(--core-color-opacity-black-400)"
                iconSize="sm"
            />
        ),
    },
    argTypes: {
        type: {
            control: {
                type: "text",
            },
            options: ["text", "email", "password"],
        },
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
    },
    decorators: [
        (Story, context) => {
            const { args } = context;
            const [value, setValue] = useState(args.value ?? "");
            return (
                <>
                    <Story {...context} args={{ ...args, value, onChange: (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value) }} />
                </>
            );
        },
    ],
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSearchField: Story = {
    args: {
        placeholder,
    },
};
export const SuccessSearchField: Story = {
    args: {
        placeholder,
        variant: variants.outline,
        status: status.success,
    },
};
export const ErrorSearchField: Story = {
    args: {
        placeholder,
        variant: variants.outline,
        status: status.error,
    },
};
export const DisabledSearchField: Story = {
    args: {
        placeholder,
        disabled: true,
        variant: variants.outline,
    },
};

export const SuccessStatusIconSearchField: Story = {
    args: {
        placeholder,
        variant: variants.outline,
        status: status.success,
    },
    argTypes: {
        status: {
            table: {
                disable: true,
            },
        },
    },
};

export const StatusMessageSearchField: Story = {
    args: {
        placeholder,
        variant: variants.outline,
        status: status.success,
        leftStatusMessage,
    },
};

export const DoubleStatusMessageSearchField: Story = {
    args: {
        placeholder,
        variant: variants.outline,
        status: status.error,
        leftStatusMessage,
    },
};

export const SuccessMessageSearchFieldWithIcons: Story = {
    args: {
        placeholder,
        variant: variants.outline,
        status: status.success,
        leftStatusMessage,
    },
};
export const ErrorMessageSearchFieldWithIcons: Story = {
    args: {
        placeholder,
        variant: variants.outline,
        status: status.error,
        leftStatusMessage,
    },
};
