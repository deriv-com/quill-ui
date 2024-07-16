import { Meta, StoryObj } from "@storybook/react";
import { DatePickerDropdown } from ".";
import {
    StandaloneCircleCheckBoldIcon,
    StandaloneTriangleExclamationBoldIcon,
} from "@deriv/quill-icons";
import { LabelPairedPlaceholderCaptionBoldIcon } from "@deriv/quill-icons/LabelPaired";

const icons: Record<string, object | null> = {
    with_icon: <LabelPairedPlaceholderCaptionBoldIcon />,
    none: null,
};

const meta = {
    title: "Components/Inputs/DatePicker",
    component: DatePickerDropdown,
    parameters: {
        docs: {
            story: {
                height: "420px",
                width: "350px",
            },
        },
        center: true,
    },
    tags: ["autodocs"],
    args: {
        disabled: false,
        isAutocomplete: false,
        onSelectDate: (value: Date) => {
            return value;
        },
        status: "neutral",
        placeholder: "dd/mm/yyyy",
        variant: "fill",
        label: "",
        required: false,
        fieldMarker: false,
    },
    argTypes: {
        id: {
            control: "text",
            description: "id to the input element",
        },
        disabled: {
            description: "To disable datepicker dropdown",
        },
        status: {
            table: { type: { summary: "neutral | success | error" } },
            options: ["neutral", "success", "error"],
            control: { type: "radio" },
        },
        textAlignment: {
            table: { type: { summary: "left | center" } },
            options: ["left", "center"],
            control: { type: "radio" },
        },
        inputSize: {
            table: { type: { summary: "sm | md" } },
            options: ["sm", "md"],
            control: { type: "radio" },
        },
        variant: {
            options: ["fill", "outline"],
            control: { type: "radio" },
        },
        datePickerProps: {
            description: "Refer to DatePicker props in Atom",
            table: {
                type: { summary: "DatePickerProps" },
                defaultValue: { summary: "-" },
            },
            control: false,
        },
        onSelectDate: {
            description:
                "Function called when user select a date in the calendar. Will return the selected value as `Date`",
            control: false,
        },
        isAutocomplete: {
            description:
                "Choose between input datepicker dropdown or only acting as a normal datepicker dropdown",
        },
        rightIcon: {
            table: { type: { summary: "ReactNode" } },
            control: "radio",
            options: Object.keys(icons),
            mapping: icons,
        },
    },
} satisfies Meta<typeof DatePickerDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultLabellessDropdown: Story = {
    args: {},
};
export const DisabledDropdown: Story = {
    args: {
        disabled: true,
    },
};
export const LabellessSuccessDropdown: Story = {
    args: {
        status: "success",
        rightIcon: <StandaloneCircleCheckBoldIcon iconSize="sm" />,
        variant: "outline",
    },
};
export const LabellessErrorDropdown: Story = {
    args: {
        rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
        status: "error",
        variant: "outline",
    },
};
export const LabellessDropdownWithErrorMessage: Story = {
    args: {
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
    },
};
export const LabelledErrorDropdown: Story = {
    args: {
        label: "Label",
        required: true,
        fieldMarker: true,
        status: "error",
        rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
    },
};
export const LabelledDropdownWithSuccessMessage: Story = {
    args: {
        label: "Label",
        required: true,
        fieldMarker: true,
        status: "success",
        message: "This is a success message",
        rightIcon: <StandaloneCircleCheckBoldIcon iconSize="sm" />,
    },
};
