import type { Meta, StoryObj } from "@storybook/react";
import DropdownChipSingleSelect from ".";
import {
    LabelPairedCircleInfoSmBoldIcon,
    LabelPairedAndroidSmIcon,
    LabelPairedAppleSmIcon,
} from "@deriv/quill-icons/LabelPaired";

const icons: Record<string, object | null> = {
    sample_1: LabelPairedCircleInfoSmBoldIcon,
    sample_2: LabelPairedAndroidSmIcon,
    sample_3: LabelPairedAppleSmIcon,
    none: null,
};

const meta = {
    title: "Components/Chips/Dropdown Chip Multi Select",
    component: DropdownChipSingleSelect,
    parameters: {
        docs: {
            story: {
                height: "250px",
            },
        },
        controls: {
            exclude: ["dismissible"],
        },
    },
    args: {
        label: "Dropdown Chip Multi Select",
        size: "md",
        disabled: false,
    },
    argTypes: {
        size: { options: ["sm", "md", "lg"], control: { type: "radio" } },
        icon: {
            description: "Icon to display on the left side of the chip",
            options: Object.keys(icons),
            mapping: icons,
            control: {
                type: "select",
            },
        },
        onSelectionChange: { action: "onChange" },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof DropdownChipSingleSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onSelectionChange: () => console.log("selection changed"),
        options: [
            { value: "1", label: "Sample Item 1" },
            {
                value: "2",
                label: "Sample Item 2 - which is disabled",
                disabled: true,
            },
            { value: "3", label: "Sample Item 3" },
            { value: "4", label: "Sample Item 4" },
        ],
    },
};
