import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxGroup } from "./index";

const config = [
    {
        label: "Parent 1",
        id: 1,
        showInfoIcon: true,
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
        showInfoIcon: true,
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
    title: "Components/Selection control/CheckboxGroup",
    component: CheckboxGroup,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    args: {
        className: "checkbox-group--demo",
        checkboxGroupConfig: config,
    },
    argTypes: {
        className: {
            table: { type: { summary: "string | undefined" } },
            description: "ClassName for external tag of the component",
            control: { type: "text" },
        },
        checkboxGroupConfig: {
            table: {
                type: {
                    summary: `
                        Omit<ComponentProps<"input">, "placeholder" | "defaultChecked" | "size"> & { \n
                        indeterminate?: boolean;\n
                        showInfoIcon?: boolean;\n
                        infoIconClassName?: string;\n
                        id: string | number;\n
                        size?: TMediumSizes;\n
                        label: ReactNode;\n
                        labelClassName?: string;\n
                        onChange?: (\n
                            e:\n
                                | React.ChangeEvent<HTMLInputElement>\n
                                | React.KeyboardEvent<HTMLSpanElement>,\n
                        ) => void;\n
                        className?: string;\n
                        children?: {same as above}[]\n
                        }[]`,
                },
            },
            description: `Config for building Parents and Children Nodes. Each object in array represents Parent Node and includes obligational fields for id and label. Optional are fields which are named the same way as props from Checkbox (single). Also, optional is field 'children', which can include an array with fractal-like Child Nodes objects. Please note, that if you want to change config passed in props, then in order to notify CheckboxGroup component about changed you need to pass config as new one (e.g. with spread operator).

                Example:
            const config = [
                {
                    label: "Parent1",
                    id: 1,
                    indeterminate: true,
                    showInfoIcon: true,
                    children: [
                        {
                            label: "Child1",
                            checked: true,
                            id: 2,
                        },
                        {
                            label: "Child2",
                            id: 3,
                        },
                        {
                            label: "Child3",
                            id: 4,
                        },
                    ],
                },
                {
                    label: "Parent2",
                    id: 5,
                    children: [
                        {
                            label: "Child1",
                            id: 6,
                        },
                    ],
                },
                {
                    label: "Parent3",
                    id: 7,
                    showInfoIcon: true,
                },
            ];`,
            control: { type: null },
        },
    },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CheckboxGroupDefault: Story = {};
