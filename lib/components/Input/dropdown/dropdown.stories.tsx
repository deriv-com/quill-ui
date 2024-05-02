import { Meta, StoryObj } from "@storybook/react";
import DropdownFeild from ".";
import {
    StandaloneCircleCheckBoldIcon,
    StandalonePlaceholderRegularIcon,
    StandaloneTriangleExclamationBoldIcon,
} from "@deriv/quill-icons";
import { LabelPairedPlaceholderSmRegularIcon } from "@deriv/quill-icons/LabelPaired";

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

const placeholder = "Select";

const meta = {
    title: "Components/Inputs/Dropdown",
    component: DropdownFeild,
    parameters: {
        docs: {
            story: {
                height: "350px",
                width: "350px",
            },
        },
    },
    tags: ["autodocs"],
    args: {
        inputSize: "md",
        status: "neutral",
        disabled: false,
        variant: "fill",
        textAlignment: "left",
        fieldMarker: false,
        required: false,
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
} satisfies Meta<typeof DropdownFeild>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DropdownFeildWithoutLabel: Story = {
    args: {
        placeholder,
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
    },
};
