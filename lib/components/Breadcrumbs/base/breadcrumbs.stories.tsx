import type { Meta, StoryObj } from "@storybook/react";
import { Base } from ".";

const meta = {
    title: "Components/Breadcrumbs/Default",
    tags: ["auto-docs"],
    component: Base,
    parameters: {
        layout: "centered",
    },
    args: {
        size: "md",
    },
    argTypes: {
        size: { options: ["sm", "md"], control: { type: "radio" } },
    },
} satisfies Meta<typeof Base>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        links: [
            {
                href: "",
                content: "Home",
                target: "_self",
            },
            {
                href: "",
                content: "Trade",
                target: "_blank",
            },
        ],
    },
};

export const Max: Story = {
    args: {
        size: "md",
        links: [
            {
                href: "",
                content: "Home",
                target: "_self",
            },
            {
                href: "/help-centre",
                content: "Help Centre",
                target: "_blank",
            },
            {
                href: "/help-centre/account",
                content: "Account",
                target: "_blank",
            },
            {
                href: "/help-centre/account/questions",
                content: "Questions",
                target: "_blank",
            },
            {
                href: "",
                content: "How to trade in Deriv",
                target: "_blank",
            },
        ],
    },
};
