import { Meta, StoryObj } from "@storybook/react";
import TextFieldAddon from ".";
import { StandaloneCircleUserRegularIcon } from "@deriv/quill-icons";

const icons: Record<string, object | null> = {
    with_icon: (
        <StandaloneCircleUserRegularIcon
            iconSize="sm"
            fill="var(--component-textIcon-normal-default)"
        />
    ),
    none: null,
};

const message = "message goes here";

const meta = {
    title: "Components/Inputs/Text Field with Addon",
    component: TextFieldAddon,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        addonLabel: "Label",
        disabled: false,
        fieldMarker: false,
        required: false,
        show_counter: false,
        fillAddonBorderColor:
            "var(--semantic-color-slate-solid-surface-frame-mid)",
    },
    argTypes: {
        inputSize: {
            control: {
                type: "radio",
            },
            options: ["sm", "md", "lg"],
            table: {
                defaultValue: { summary: "lg" },
            },
        },
        id: {
            control: "text",
            description: "id to the input element",
        },
        fillAddonBorderColor: {
            control: {
                type: "text",
            },
            description:
                "This is an optional prop only for fill variant addon border color. Pass the background color of the container to have the same border style as design.",
        },
        addOnPosition: {
            control: {
                type: "radio",
            },
            options: ["left", "right"],
            table: {
                defaultValue: { summary: "left" },
            },
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
            table: {
                defaultValue: { summary: "neutral" },
            },
        },
        variant: {
            control: {
                type: "radio",
            },
            options: ["fill", "outline"],
            table: {
                defaultValue: { summary: "outline" },
            },
        },
        rightIcon: {
            options: Object.keys(icons),
            mapping: icons,
            control: {
                type: "select",
            },
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
} satisfies Meta<typeof TextFieldAddon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LabelledOutline: Story = {
    args: {
        label: "Outline",
        placeholder: "Placeholder",
        message: message,
    },
};
export const LabelledFill: Story = {
    args: {
        label: "Fill",
        placeholder: "Placeholder",
        variant: "fill",
        message: message,
    },
};
export const LabelledlessOutline: Story = {
    args: {
        placeholder: "Placeholder",
        message: message,
    },
};
export const LabelledlessFill: Story = {
    args: {
        placeholder: "Placeholder",
        variant: "fill",
        message: message,
    },
};
