import { Meta, StoryObj } from "@storybook/react";
import TextArea from ".";
import { StandaloneCircleUserRegularIcon } from "@deriv/quill-icons";
import { Status, Variants } from "../base";

const icons: Record<string, object | null> = {
    with_icon: (
        <StandaloneCircleUserRegularIcon
            iconSize="sm"
            fill="var(--component-textIcon-normal-default)"
        />
    ),
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

const message = "Status message goes here";

const meta = {
    title: "Components/Inputs/TextArea",
    component: TextArea,
    tags: ["autodocs"],
    args: {
        size: "md",
        status: "neutral",
        disabled: false,
        variant: "fill",
        fieldMarker: false,
        required: false,
        showCharacterCounter: false,
        resizable: true,
        wrapperClassName: "wrapperClass",
        textAreaClassName: "textAreaClass",
    },
    argTypes: {
        size: {
            control: {
                type: "radio",
            },
            options: ["sm", "md"],
        },
        wrapperClassName: {
            description:
                "Class to add to the textarea wrapper. example `wrapperClass` setting the width and height of the wrapper",
        },
        textAreaClassName: {
            description: "Class to add to the textarea",
        },
        maxLength: {
            control: {
                type: "number",
            },
        },
        leftIcon: {
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
        message: {
            control: {
                type: "text",
            },
        },
    },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
        label: "Label",
    },
};

export const WithLeftIconAndLabel: Story = {
    args: {
        placeholder,
        label: "Label",
        leftIcon: <StandaloneCircleUserRegularIcon iconSize="sm" />,
    },
};

export const ReadonlyWithValue: Story = {
    args: {
        leftIcon: <StandaloneCircleUserRegularIcon iconSize="sm" />,
        value: "John Doe",
        status: "neutral",
        readOnly: true,
    },
};

export const WithStatusMessage: Story = {
    args: {
        placeholder,
        variant: variants.outline,
        status: status.success,
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
        maxLength: 200,
    },
};
