import { Meta, StoryObj } from "@storybook/react";
import InputGroupButton from ".";
// import { Status, Variants } from "../../base";
import { StandaloneCircleUserRegularIcon } from "@deriv/quill-icons/Standalone";

const icons: Record<string, object | null> = {
    with_icon: <StandaloneCircleUserRegularIcon iconSize="sm" />,
    none: null,
};

const meta = {
    title: "Components/Inputs/InputGroup/Input+Button",
    component: InputGroupButton,
    decorators: [
        (Story) => (
            <div style={{ width: "20rem" }}>
                <Story />
            </div>
        ),
    ],
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
        fieldMarker: false,
        required: false,
        showCharacterCounter: false,
        buttonLabel: "Button",
        buttonPosition: "right",
        buttonVariant: "primary",
    },
    argTypes: {
        type: {
            control: "text",
        },
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
        maxLength: {
            control: {
                type: "number",
            },
        },
        buttonPosition: {
            control: { type: "radio" },
            options: ["right", "bottom"],
        },
        buttonVariant: {
            control: { type: "radio" },
            options: ["primary", "secondary", "tertiary"],
        },
    },
} satisfies Meta<typeof InputGroupButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: "Placeholder",
    },
};

export const LabelledWithButtonBottom: Story = {
    args: {
        label: "Label",
        buttonPosition: "bottom",
        variant: "outline",
    },
};

export const LabelledWithButtonBottomAndValue: Story = {
    args: {
        label: "Label",
        value: "Input Value",
        buttonPosition: "bottom",
        variant: "outline",
    },
};

export const LabelledWithButtonRight: Story = {
    args: {
        label: "Label",
        buttonPosition: "right",
        variant: "outline",
    },
};

export const WithLeftIconAndButtonBottom: Story = {
    args: {
        variant: "outline",
        placeholder: "Placeholder",
        label: "Label",
        buttonPosition: "bottom",
        leftIcon: <StandaloneCircleUserRegularIcon iconSize="sm" />,
    },
};

export const SuccessWithMessageAndCharacterCounter: Story = {
    args: {
        label: "Label",
        value: "Hello World",
        status: "success",
        buttonPosition: "right",
        variant: "outline",
        message: "Message goes here",
        showCharacterCounter: true,
        maxLength: 20,
    },
};
