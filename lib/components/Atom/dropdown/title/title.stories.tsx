import type { Meta, StoryObj } from "@storybook/react";
import { DropdownTitle } from ".";
import { LabelPairedPlaceholderCaptionBoldIcon } from "@deriv/quill-icons";

const icons: Record<string, object | null> = {
    with_icon: <LabelPairedPlaceholderCaptionBoldIcon />,
    none: null,
};

const meta = {
    title: "Components/Atom/Dropdown/Title",
    component: DropdownTitle,
    args: {
        centered: false,
    },
    argTypes: {
        size: {
            options: ["sm", "md"],
            control: { type: "radio" },
            description: "To select the size of the title",
        },
        icon: {
            description: "This props allowed you to pass in icon for title",
            options: Object.keys(icons),
            mapping: icons,
            control: "radio",
        },
        as: {
            control: false,
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof DropdownTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SmallTitle: Story = {
    args: {
        label: "Title",
        size: "sm",
    },
};
export const MediumTitle: Story = {
    args: {
        label: "Title",
        size: "md",
    },
};
