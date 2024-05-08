import type { Meta, StoryObj } from "@storybook/react";
import DismissibleChip from ".";
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
    title: "Components/Chips/Dismissible Chip",
    component: DismissibleChip,
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
    },
    tags: ["autodocs"],
} satisfies Meta<typeof DismissibleChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
