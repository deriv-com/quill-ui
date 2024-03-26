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
        selectedItemIndex: 0,
        size: "sm",
    },
    argTypes: {
        className: {
            control: { type: null },
            description: "Optional.",
            table: {
                type: { summary: "string | undefined" },
            },
        },
        onChange: {
            description:
                "Optional. You can use it to react to selection change.",
            control: { type: null },
        },
        options: {
            control: { type: null },
            description:
                "Required. The first element in `options` is selected by default. You can pass `selectedItemIndex` prop to make another element selected. `icon` can be a component or a string, e.g. the name of an icon from `@deriv/quill-icons`.",
        },
        selectedItemIndex: {
            options: [0, 1, 2, 3, 4],
            control: { type: "radio" },
            description:
                "Optional. Index of one of the elements in `options` array. You can use `selectedItemIndex` and `onChange` to control selection.",
        },
        size: {
            options: ["sm", "md", "lg"],
            control: { type: "radio" },
            description: "Optional.",
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
