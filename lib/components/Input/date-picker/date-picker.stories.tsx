import { Meta, StoryObj } from "@storybook/react";
import { DatePickerDropdown } from ".";
import {
    StandaloneCircleCheckBoldIcon,
    StandaloneTriangleExclamationBoldIcon,
} from "@deriv/quill-icons";
import { LabelPairedPlaceholderCaptionBoldIcon } from "@deriv/quill-icons/LabelPaired";
import dayjs from "dayjs";
import BreakpointProvider from "@providers/breakpoint/breakpointProvider";

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
        value: dayjs(Date.now()).format("DD/MM/YYYY"),
        fullHeightOnOpen: true,
        inputSize: "lg"
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
            table: { type: { summary: "sm | md | lg" } },
            options: ["sm", "md", "lg"],
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

const Template: React.FC<React.ComponentProps<typeof DatePickerDropdown>> = (
    args,
) => (
    <div style={{ display: "flex", gap: "10px" }}>
        <BreakpointProvider>
            <DatePickerDropdown {...args} />
        </BreakpointProvider>
    </div>
);

export const Default = Template.bind(this) as Story;

Default.args = { ...meta.args };

export const DisabledDropdown = Template.bind(this) as Story;
DisabledDropdown.args = {
    ...meta.args,
    disabled: true,
};
export const LabellessSuccessDropdown = Template.bind(this) as Story;
LabellessSuccessDropdown.args = {
    ...meta.args,
    status: "success",
    rightIcon: <StandaloneCircleCheckBoldIcon iconSize="sm" />,
    variant: "outline",
};
export const LabellessErrorDropdown = Template.bind(this) as Story;
LabellessErrorDropdown.args = {
    ...meta.args,
    rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
    status: "error",
    variant: "outline",
};
export const LabellessDropdownWithErrorMessage = Template.bind(this) as Story;
LabellessDropdownWithErrorMessage.args = {
    ...meta.args,
    rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
    message: "This is an error message",
    status: "error",
};
export const DefaultInputDropdownWithLabel = Template.bind(this) as Story;
DefaultInputDropdownWithLabel.args = {
    ...meta.args,
    label: "Label",
    required: true,
    fieldMarker: true,
};
export const LabelledSuccessDropdown = Template.bind(this) as Story;
LabelledSuccessDropdown.args = {
    ...meta.args,
    label: "Label",
    required: true,
    fieldMarker: true,
    variant: "fill",
    status: "success",
    rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
};
export const LabelledDropdownOutlined = Template.bind(this) as Story;
LabelledDropdownOutlined.args = {
    ...meta.args,
    label: "Label",
    required: true,
    fieldMarker: true,
    variant: "outline",
    status: "neutral",
    rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
};
export const LabelledSuccessDropdownOutlined = Template.bind(this) as Story;
LabelledSuccessDropdownOutlined.args = {
    ...meta.args,
    label: "Label",
    required: true,
    fieldMarker: true,
    variant: "outline",
    status: "success",
    rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
};
export const LabelledErrorDropdownOutlined = Template.bind(this) as Story;
LabelledErrorDropdownOutlined.args = {
    ...meta.args,
    label: "Label",
    required: true,
    fieldMarker: true,
    variant: "outline",
    status: "error",
    rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
};
export const LabelledErrorDropdown = Template.bind(this) as Story;
LabelledErrorDropdown.args = {
    ...meta.args,
    label: "Label",
    required: true,
    fieldMarker: true,
    status: "error",
    rightIcon: <StandaloneTriangleExclamationBoldIcon iconSize="sm" />,
};
export const LabelledDropdownWithSuccessMessage = Template.bind(this) as Story;
LabelledDropdownWithSuccessMessage.args = {
    ...meta.args,
    label: "Label",
    required: true,
    fieldMarker: true,
    status: "success",
    message: "This is a success message",
    rightIcon: <StandaloneCircleCheckBoldIcon iconSize="sm" />,
};
