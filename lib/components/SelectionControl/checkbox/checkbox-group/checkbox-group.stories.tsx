import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxGroup } from "./index";

const config = [
    {
        label: "Parent 1",
        id: 1,
        infoIconMessage: "info message of parent 1",
        children: [
            {
                label: "Child 1",
                checked: true,
                id: 2,
            },
            {
                label: "Child 2",
                id: 3,
            },
            {
                label: "Child 3",
                id: 4,
            },
        ],
    },
    {
        label: "Parent 2",
        id: 5,
        children: [
            {
                label: "Child 1",
                id: 6,
            },
        ],
    },
    {
        label: "Parent 3",
        id: 7,
        infoIconMessage: "info message of parent 3",
        checked: true,
    },
    {
        label: "Parent 4",
        id: 8,
        disabled: true,
        children: [
            {
                label: "Child 1",
                id: 9,
                showInfoIcon: true,
            },
            {
                label: "Child 2",
                id: 10,
            },
        ],
    },
];

const meta = {
    title: "Components/Selection Control/Checkbox Group",
    component: CheckboxGroup,
    tags: ["autodocs"],
    args: {
        className: "checkbox-group--demo",
        checkboxGroupConfig: config,
    },
    argTypes: {
        className: {
            description: "ClassName for external tag of the component",
            control: false,
        },
        checkboxGroupConfig: {
            table: {
                type: {
                    summary: `
                        Omit<ComponentProps<"input">, "placeholder" | "defaultChecked" | "size"> & {
                        indeterminate?: boolean;
                        showInfoIcon?: boolean;
                        infoIconClassName?: string;
                        id: string | number;
                        size?: TMediumSizes;
                        label: ReactNode;
                        labelClassName?: string;
                        onChange?: (
                            e:
                                | React.ChangeEvent<HTMLInputElement>
                                | React.KeyboardEvent<HTMLSpanElement>,
                        ) => void;
                        className?: string;
                        children?: {same as above}[]
                        }[]`,
                },
            },
            description:
                "Config for building Parents and Children Nodes. Each object in array represents Parent Node and includes obligational fields for id and label. Optional are fields which are named the same way as props from Checkbox (single). Also, optional is field 'children', which can include an array with fractal-like Child Nodes objects. Please note, that if you want to change config passed in props, then in order to notify CheckboxGroup component about changed you need to pass config as new one (e.g. with spread operator).",
            control: false,
        },
    },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CheckboxGroupDefault: Story = {};
