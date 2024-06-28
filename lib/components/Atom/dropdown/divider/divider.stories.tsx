import type { Meta, StoryObj } from "@storybook/react";
import Divider from ".";

const meta = {
    title: "Components/Atom/Dropdown/Divider",
    component: Divider,
    tags: ["autodocs"],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
