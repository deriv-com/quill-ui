import type { Meta, StoryObj } from "@storybook/react";
import { CodeText } from ".";

const meta = {
    title: "Typography/Code",
    component: CodeText,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    args: {
        italic: false,
        bold: false,
        underlined: false,
    },
    argTypes: {
        as: { table: { disable: true } },
        size: {
            options: ["sm", "md", "lg", "xl"],
            control: { type: "radio" },
        },
    },
} satisfies Meta<typeof CodeText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RegularDefault: Story = {
    args: {
        children: "Caption - regular default",
    },
};
export const RegularItalic: Story = {
    args: {
        children: "Caption - regular italic",
        italic: true,
    },
};
export const RegularUnderlined: Story = {
    args: {
        children: "Caption - regular underlined",
        underlined: true,
    },
};
export const RegularItalicUnderlined: Story = {
    args: {
        children: "Caption - regular italic underlined",
        italic: true,
        underlined: true,
    },
};
export const BoldDefault: Story = {
    args: {
        children: "Caption - Bold default",
        bold: true,
    },
};
export const BoldItalic: Story = {
    args: {
        children: "Caption - Bold italic",
        italic: true,
        bold: true,
    },
};
export const BoldUnderlined: Story = {
    args: {
        children: "Caption - Bold underlined",
        underlined: true,
        bold: true,
    },
};
export const BoldItalicUnderlined: Story = {
    args: {
        children: "Caption - Bold italic underlined",
        italic: true,
        underlined: true,
        bold: true,
    },
};
