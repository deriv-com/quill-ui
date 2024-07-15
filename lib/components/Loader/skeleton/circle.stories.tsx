import type { Meta, StoryObj } from "@storybook/react";
import Skeleton from ".";
import "@deriv-com/quill-tokens/dist/quill.css";

const meta = {
    title: "Components/Loader/Skeleton/Circle",
    component: Skeleton.Circle,
    args: {
        active: true,
    },
    argTypes: {
        width: {
            description: "A prop to set the width of the skeleton.",
            table: { defaultValue: { summary: "100" } },
        },
        active: {
            description: "A prop to set on and off animation of the skeleton",
            table: { defaultValue: { summary: "true" } },
        },
        className: {
            control: false,
        },
        style: {
            control: false,
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Skeleton.Circle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        width: 100,
    },
};
