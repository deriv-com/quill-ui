import type { Meta, StoryObj } from "@storybook/react";
import { Base } from ".";
import { Breadcrumbs } from "../index";
import BreakpointProvider from "@providers/breakpoint/breakpointProvider";

const links = [
    {
        href: "/",
        content: "Home",
    },
    {
        href: "/",
        content: "Trade",
    },
];

const meta = {
    title: "Components/Breadcrumbs/Default",
    tags: ["auto-docs"],
    component: Base,
    parameters: {
        layout: "centered",
    },
    args: {
        size: "md",
        links: links,
    },
    argTypes: {
        size: { options: ["sm", "md"], control: { type: "radio" } },
    },
} satisfies Meta<typeof Base>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: React.FC<React.ComponentProps<typeof Base>> = (args) => (
    <div>
        <BreakpointProvider>
            <Breadcrumbs {...args} />
        </BreakpointProvider>
    </div>
);
export const Default = Template.bind(this) as Story;

Default.args = { ...meta.args };

export const MaxLinks = Template.bind(this) as Story;
MaxLinks.args = {
    ...meta.args,
    links: [
        ...links,
        {
            href: "/",
            content: "Help Centre",
        },
        {
            href: "/",
            content: "Account",
        },
        {
            href: "/",
            content: "Questions",
        },
        {
            href: "/",
            content: "How to trade in Deriv",
        },
    ],
};
