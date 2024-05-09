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
const options = [
    { value: "1", label: "Sample Item 1" },
    {
        value: "2",
        label: "Sample Item 2",
    },
    { value: "3", label: "Sample Item 3" },
    { value: "4", label: "Sample Item 4" },
    { value: "5", label: "Selected Item 5" },
];

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
        message: {
            control: {
                type: "text",
            },
        },
    },
} satisfies Meta<typeof DropdownFeild>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultLabellessDropdown: Story = {
    args: {
        placeholder,
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
        options: options,
    },
};
export const DisabledDropdown: Story = {
    args: {
        placeholder,
        disabled: true,
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
        options: options,
    },
};
export const LabellessSuccessDropdown: Story = {
    args: {
        placeholder,
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
        status: "success",
        rightIcon: <StandaloneCircleCheckBoldIcon iconSize="sm" />,
        variant: "fill",
        options: options,
    },
};
export const LabellessErrorDropdown: Story = {
    args: {
        placeholder,
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
        rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
        status: "error",
        variant: "fill",
        options: options,
    },
};
export const LabellessDropdownWithErrorMessage: Story = {
    args: {
        placeholder,
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
        rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
        message: "This is an error message",
        status: "error",
        variant: "fill",
        options: options,
    },
};
export const DefaultDropdownFeildWithLabel: Story = {
    args: {
        placeholder,
        label: "Label",
        required: true,
        fieldMarker: true,
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
        options: options,
    },
};
export const LabelledSuccessDropdown: Story = {
    args: {
        placeholder,
        label: "Label",
        required: true,
        fieldMarker: true,
        variant: "fill",
        status: "success",
        rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
        options: options,
    },
};
export const LabelledErrorDropdown: Story = {
    args: {
        placeholder,
        label: "Label",
        required: true,
        fieldMarker: true,
        variant: "fill",
        status: "error",
        rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
        options: options,
    },
};
export const LabelledDropdownWithSuccessMessage: Story = {
    args: {
        placeholder,
        label: "Label",
        required: true,
        fieldMarker: true,
        variant: "fill",
        status: "success",
        message: "This is a success message",
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
        rightIcon: <StandaloneCircleCheckBoldIcon iconSize="sm" />,
        options: options,
    },
};
export const DropdownWithLongOptionsList: Story = {
    args: {
        placeholder,
        label: "Label",
        leftIcon: <LabelPairedPlaceholderSmRegularIcon />,
        options: [
            { value: "1", label: "Sample Item 1" },
            {
                value: "2",
                label: "Sample Item 2",
            },
            { value: "3", label: "Sample Item 3" },
            { value: "4", label: "Sample Item 4" },
            { value: "5", label: "Sample Item 5" },
            {
                value: "6",
                label: "Sample Item 6",
            },
            { value: "7", label: "Sample Item 7" },
            { value: "8", label: "Sample Item 8" },
            { value: "9", label: "Sample Item 9" },
            { value: "10", label: "Sample Item 10" },
            {
                value: "11",
                label: "Sample Item 11",
            },
            { value: "12", label: "Sample Item 12" },
            { value: "13", label: "Sample Item 13" },
        ],
    },
};
