import type { Meta, StoryObj } from "@storybook/react";
import { Base } from ".";
import {
    LabelPairedCircleInfoMdBoldIcon,
    LabelPairedAndroidMdIcon,
    LabelPairedAppleMdIcon,
} from "@deriv/quill-icons";

const icons: Record<string, object | null> = {
    sample_1: LabelPairedCircleInfoMdBoldIcon,
    sample_2: LabelPairedAndroidMdIcon,
    sample_3: LabelPairedAppleMdIcon,
    none: null,
};

const meta = {
    title: "Chip/Base",
    component: Base,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    args: {},
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
} satisfies Meta<typeof Base>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "Label Here",
        dropdown: true,
    },
};
