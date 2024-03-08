import type { Meta, StoryObj } from "@storybook/react";
import Text from ".";

const meta = {
    title: "Typography/Text",
    component: Text,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    args: {
        italic: false,
        bold: false,
        underlined: false,
    },
    argTypes: {
        size: {
            description: " `sm` | `md` | `lg` | `xl`",
            options: ["sm", "md", "lg", "xl"],
            control: { type: "radio" },
            table: {
                defaultValue: { summary: "md" },
            },
        },
    },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SizeXL: Story = {
    args: {
        children: "This is body text - xl",
        size: "xl",
    },
};
export const SizeLG: Story = {
    args: {
        children: "This is body text - lg",
        size: "lg",
    },
};

export const SizeMD: Story = {
    args: {
        children: "This is body text - md",
    },
};
export const SizeSM: Story = {
    args: {
        children: "This is body text - sm",
        size: "sm",
    },
};
