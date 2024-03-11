import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "../../lib/main";

const meta = {
    title: "Typography/Heading",
    component: Heading.H1,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    argTypes: {
        as: { table: { disable: true } },
    },
} satisfies Meta<typeof Heading.H1>;

export default meta;

type Story = StoryObj<typeof meta>;

export const H1: Story = {
    args: {
        children: "This is H1",
    },
};

export const H2 = (args: Story) => (
    <Heading.H2 {...args}>This is H2</Heading.H2>
);
export const H3 = (args: Story) => (
    <Heading.H3 {...args}>This is H3</Heading.H3>
);
export const H4 = (args: Story) => (
    <Heading.H4 {...args}>This is H4</Heading.H4>
);
export const H5 = (args: Story) => (
    <Heading.H5 {...args}>This is H5</Heading.H5>
);
export const H6 = (args: Story) => (
    <Heading.H6 {...args}>This is H6</Heading.H6>
);
