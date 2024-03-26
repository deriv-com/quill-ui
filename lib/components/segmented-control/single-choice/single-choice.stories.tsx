import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import SegmentedControlSingleChoice from ".";
import { ComponentProps } from "react";

const meta = {
    title: "Components/SegmentedControl/SegmentedControlSingleChoice",
    component: SegmentedControlSingleChoice,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    args: {
        onChange: fn(),
        size: "sm",
    },
    argTypes: {
        className: {
            control: { type: null },
            table: {
                type: { summary: "string | undefined" },
            },
        },
        options: {
            control: { type: null },
            description:
                "Required. The first element in `options` is selected by default. You can pass `selectedItemIndex` to make another element selected. `icon` can be a component or a string name of an icon from `@deriv/quill-icons`. `label` is a string.",
        },
        onChange: {
            control: { type: null },
        },
        selectedItemIndex: {
            options: [0, 1, 2, 3, 4],
            control: { type: "radio" },
            description:
                "Optional. You can pass this index and `onChange` to control the selection using external state in the parent.",
        },
        size: {
            options: ["sm", "md", "lg"],
            control: { type: "radio" },
            table: {
                type: { summary: "string | undefined" },
            },
        },
    },
} satisfies Meta<typeof SegmentedControlSingleChoice>;

export default meta;

const placeholder = {
    sm: "LabelPairedPlaceholderSmRegularIcon",
    md: "LabelPairedPlaceholderMdRegularIcon",
    lg: "LabelPairedPlaceholderLgRegularIcon",
};

export const SingleChoiceGroupWithIconsOnly = (
    args: ComponentProps<typeof SegmentedControlSingleChoice>,
) => (
    <SegmentedControlSingleChoice
        {...args}
        options={new Array(5).fill({
            icon: placeholder[args.size as keyof typeof placeholder],
        })}
    />
);

export const SingleChoiceGroupWithLabelsOnly = (
    args: ComponentProps<typeof SegmentedControlSingleChoice>,
) => (
    <SegmentedControlSingleChoice
        {...args}
        options={new Array(5).fill({
            label: "Label",
        })}
    />
);

export const SingleChoiceGroupWithIconsAndLabels = (
    args: ComponentProps<typeof SegmentedControlSingleChoice>,
) => (
    <SegmentedControlSingleChoice
        {...args}
        options={new Array(5).fill({
            icon: placeholder[args.size as keyof typeof placeholder],
            label: "Label",
        })}
    />
);
