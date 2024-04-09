import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxGroup } from "./index";

const meta = {
    title: "Components/Selection control/CheckboxGroup",
    component: CheckboxGroup,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    args: {
        className: "checkbox-group--demo",
    },
    argTypes: {
        className: {
            table: { type: { summary: "string | undefined" } },
            description: "ClassName for external tag of the component",
            control: { type: "text" },
        },
    },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CheckboxGroupDefault: Story = {};
