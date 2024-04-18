import type { Meta, StoryObj } from "@storybook/react";
import { LabelPairedPlaceholderCaptionBoldIcon } from "@deriv/quill-icons";
import SelectableChip from ".";

const icons: Record<string, object | null> = {
    with_icon: LabelPairedPlaceholderCaptionBoldIcon,
    none: null,
};

const meta = {
    title: "Components/Chips/Selectable Chip",
    component: SelectableChip,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    argTypes: {
        size: { options: ["sm", "md", "lg"], control: { type: "radio" } },
        icon: {
            description: "Icon to display on the left side of the chip",
            options: Object.keys(icons),
            mapping: icons,
            control: {
                type: "radio",
            },
        },
        disabled: {
            description: "disabled the chip",
            control: { type: "boolean" },
        },
    },
} satisfies Meta<typeof SelectableChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Label Here",
    },
};
