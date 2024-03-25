import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { SingleChoice } from ".";

const meta = {
    title: "Components/SegmentedControl/SingleChoice",
    component: SingleChoice.GroupWithIconsOnly,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    args: {
        onChange: fn(),
        selectedItemIndex: 0,
        size: "sm",
    },
    argTypes: {
        onChange: {
            control: { type: null },
            description: "type: (selectedItemIndex: number) => void",
        },
        selectedItemIndex: {
            options: [0, 1, 2, 3, 4],
            control: { type: "radio" },
        },
        size: { options: ["sm", "md", "lg"], control: { type: "radio" } },
    },
} satisfies Meta<typeof SingleChoice.GroupWithIconsOnly>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleChoiceGroupWithIconsOnly = (args: Story) => (
    <SingleChoice.GroupWithIconsOnly {...args} />
);

export const SingleChoiceGroupWithLabelsOnly = (args: Story) => (
    <SingleChoice.GroupWithLabelsOnly {...args} />
);

export const SingleChoiceGroupWithIconsAndLabels = (args: Story) => (
    <SingleChoice.GroupWithIconsAndLabels {...args} />
);
