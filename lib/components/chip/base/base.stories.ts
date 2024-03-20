import type { Meta, StoryObj } from "@storybook/react";
import { Base } from ".";

const meta = {
    title: "Chip/Base",
    component: Base,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    args: {},
    argTypes: {},
} satisfies Meta<typeof Base>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Chip",
        dropdown: true,
    },
};
