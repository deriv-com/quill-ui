import { Meta, StoryObj } from "@storybook/react";
import { InputDropdown } from ".";
import {
    StandaloneCircleCheckBoldIcon,
    StandaloneTriangleExclamationBoldIcon,
} from "@deriv/quill-icons";
import {
    LabelPairedPlaceholderCaptionBoldIcon,
    LabelPairedPlaceholderSmRegularIcon,
} from "@deriv/quill-icons/LabelPaired";

const icons: Record<string, object | null> = {
    with_icon: <LabelPairedPlaceholderCaptionBoldIcon />,
    none: null,
};

const meta = {
    title: "Components/Inputs/Dropdown",
    component: InputDropdown,
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
        disabled: false,
        isAutocomplete: false,
        options: [
            { text: "Option 1", value: "option1" },
            { text: "Option 2", value: "option2" },
            { text: "Option 3", value: "option3" },
        ],
        onSelectOption: (value: string) => {
            return value;
        },
        status: "neutral",
        placeholder: "Select",
        variant: "fill",
        label: "",
        value: "option1",
        inputSize: "lg",
    },
    argTypes: {
        id: {
            control: "text",
            description: "id to the input element",
        },
        status: {
            table: { type: { summary: `"neutral" | "success"| "error"` } },
            options: ["neutral", "success", "error"],
            control: { type: "radio" },
        },
        textAlignment: {
            table: { type: { summary: `"left" | "center"` } },
            options: ["left", "center"],
            control: { type: "radio" },
        },
        inputSize: {
            options: ["sm", "md", "lg"],
            control: { type: "radio" },
        },
        variant: {
            options: ["fill", "outline"],
            control: { type: "radio" },
        },
        isAutocomplete: {
            control: "boolean",
            description:
                "Choose between input dropdown or only acting as a normal dropdown",
            table: { type: { summary: "boolean" } },
        },
        leftIcon: {
            table: { type: { summary: "ReactNode" } },
            control: "radio",
            options: Object.keys(icons),
            mapping: icons,
        },
        rightIcon: {
            table: { type: { summary: "ReactNode" } },
            control: "radio",
            options: Object.keys(icons),
            mapping: icons,
        },
    },
} satisfies Meta<typeof InputDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultLabellessDropdown: Story = {
    args: {},
};
export const DisabledDropdown: Story = {
    args: {
        disabled: true,
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
    },
};
export const LabellessSuccessDropdown: Story = {
    args: {
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
        status: "success",
        rightIcon: <StandaloneCircleCheckBoldIcon iconSize="sm" />,
        variant: "outline",
    },
};
export const LabellessErrorDropdown: Story = {
    args: {
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
        rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
        status: "error",
        variant: "outline",
    },
};
export const LabellessDropdownWithErrorMessage: Story = {
    args: {
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
        rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
        message: "This is an error message",
        status: "error",
    },
};
export const DefaultInputDropdownWithLabel: Story = {
    args: {
        label: "Label",
        required: true,
        fieldMarker: true,
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
    },
};
export const LabelledSuccessDropdown: Story = {
    args: {
        label: "Label",
        required: true,
        fieldMarker: true,
        variant: "fill",
        status: "success",
        rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
    },
};
export const LabelledDropdownOutlined: Story = {
    args: {
        label: "Label",
        required: true,
        fieldMarker: true,
        variant: "outline",
        status: "neutral",
        rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
    },
};
export const LabelledSuccessDropdownOutlined: Story = {
    args: {
        label: "Label",
        required: true,
        fieldMarker: true,
        variant: "outline",
        status: "success",
        rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
    },
};
export const LabelledErrorDropdownOutlined: Story = {
    args: {
        label: "Label",
        required: true,
        fieldMarker: true,
        variant: "outline",
        status: "error",
        rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
    },
};
export const LabelledErrorDropdown: Story = {
    args: {
        label: "Label",
        required: true,
        fieldMarker: true,
        status: "error",
        rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
    },
};
export const LabelledDropdownWithSuccessMessage: Story = {
    args: {
        label: "Label",
        required: true,
        fieldMarker: true,
        status: "success",
        message: "This is a success message",
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
        rightIcon: <StandaloneCircleCheckBoldIcon iconSize="sm" />,
    },
};
export const DropdownWithLongOptionsList: Story = {
    args: {
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
        options: [
            { text: "Option 1", value: "option1" },
            { text: "Option 2", value: "option2" },
            { text: "Option 3", value: "option3" },
            { text: "Option 4", value: "option4" },
            { text: "Option 5", value: "option5" },
            { text: "Option 6", value: "option6" },
            { text: "Option 7", value: "option7" },
            { text: "Option 8", value: "option8" },
            { text: "Option 9", value: "option9" },
            { text: "Option 10", value: "option10" },
            { text: "Option 11", value: "option11" },
            { text: "Option 12", value: "option12" },
        ],
    },
};
