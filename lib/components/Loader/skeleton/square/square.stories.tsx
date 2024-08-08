import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "..";
import "@deriv-com/quill-tokens/dist/quill.css";

const meta = {
    title: "Components/Loader/Skeleton/Square",
    component: Skeleton.Square,
    args: {
        rounded: false,
        active: true,
    },
    decorators: [
        (Story) => (
            <div style={{ height: "100px", width: "100%" }}>
                <Story />
            </div>
        ),
    ],
    argTypes: {
        height: {
            description: "A prop to set the height of the skeleton.",
            table: { defaultValue: { summary: "100" } },
        },
        width: {
            description: "A prop to set the width of the skeleton.",
            table: { defaultValue: { summary: "100" } },
        },
        active: {
            description: "A prop to set on and off animation of the skeleton",
            table: { defaultValue: { summary: "true" } },
        },
        fullWidth: {
            description: "A prop to set skeleton to full width",
            table: { defaultValue: { summary: "false" } },
        },
        rounded: {
            description: "A prop to toggle border radius of the skeleton",
            table: { defaultValue: { summary: "false" } },
        },
        className: {
            table: { type: { summary: "string" } },
            control: false,
        },
        style: {
            table: { type: { summary: "ReactCSSProperties" } },
            control: false,
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Skeleton.Square>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        width: "100%",
    },
};
