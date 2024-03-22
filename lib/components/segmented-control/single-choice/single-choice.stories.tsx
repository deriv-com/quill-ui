import type { Meta } from "@storybook/react";
import { SingleChoice } from ".";

const meta = {
    title: "Components/SegmentedControl/SingleChoice",
    component: SingleChoice.Group,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    argTypes: {
        as: { table: { disable: true } },
    },
} satisfies Meta<typeof SingleChoice.Group>;

export default meta;

// type Story = StoryObj<typeof meta>;

// TODO: to create more stories with different props
export const Group = () => <SingleChoice.Group />;
