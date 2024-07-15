import type { Meta, StoryObj } from "@storybook/react";
import "@deriv-com/quill-tokens/dist/quill.css";
import Spinner from ".";

const meta = {
    title: "Components/Loader/Skeleton/Spinner",
    component: Spinner,
    argTypes: {
        size: {
            options: ["xs", "sm", "md", "lg", "xl", "2xl"],
            control: "radio",
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: "md",
    },
};
