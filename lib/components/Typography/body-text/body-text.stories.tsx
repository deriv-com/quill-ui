import type { Meta, StoryObj } from "@storybook/react";
import BodyText from ".";

const meta = {
    title: "Typography/BodyText",
    component: BodyText,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
} satisfies Meta<typeof BodyText>;

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
