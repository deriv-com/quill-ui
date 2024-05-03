import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./index";

const meta = {
    title: "Components/Atom/DatePicker",
    component: DatePicker,
    parameters: { layout: "centered" },
    tags: ["autodocs"],
    args: {
        // activeStartDate: new Date(2017, 0, 1),
    },
    argTypes: {
        activeStartDate: {
            table: { type: { summary: "Date | undefined" } },
            description:
                "The beginning of a period that shall be displayed. If you wish to use react-calendar in an uncontrolled way, use defaultActiveStartDate instead. Default value - today. Example values: new Date(2017, 0, 1).",
            control: { type: "date" },
        },
        allowPartialRange: {
            table: { type: { summary: "boolean | undefined" } },
            description:
                "Whether to call onChange with only partial result given selectRange prop. Default value - false.",
            options: ["true", "false"],
            control: { type: "boolean" },
        },
        calendarType: {
            table: {
                type: {
                    summary:
                        "'gregory' | 'hebrew' | 'islamic' | 'iso8601' | undefined",
                },
            },
            description:
                "Type of calendar that should be used. Can be 'gregory, 'hebrew', 'islamic', 'iso8601'. Setting to 'gregory' or 'hebrew' will change the first day of the week to Sunday. Setting to 'islamic' will change the first day of the week to Saturday. Setting to 'islamic' or 'hebrew' will make weekends appear on Friday to Saturday. Default value - type of calendar most commonly used in a given locale.",
            options: ["gregory", "hebrew", "islamic", "iso8601"],
            control: { type: "string" },
        },
        // disabled: {
        //     table: { type: { summary: "boolean | undefined" } },
        //     description: "Flag for setting accessibility",
        //     options: ["true", "false"],
        //     control: { type: "boolean" },
        // },
        // indeterminate: {
        //     table: { type: { summary: "boolean | undefined" } },
        //     description: "Flag for setting indeterminate state",
        //     options: ["true", "false"],
        //     control: { type: "boolean" },
        // },
        // infoIconClassName: {
        //     table: { type: { summary: "string | undefined" } },
        //     description: "ClassName for info icon",
        //     control: { type: "text" },
        // },
        // showInfoIcon: {
        //     table: { type: { summary: "boolean | undefined" } },
        //     description: "Flag for adding info icon",
        //     options: ["true", "false"],
        //     control: { type: "boolean" },
        // },
        // size: {
        //     table: { type: { summary: "string | undefined" } },
        //     description: "Size of the label and info icon",
        //     options: ["sm", "md"],
        //     control: { type: "radio" },
        // },
        // label: {
        //     table: { type: { summary: "React.Node" } },
        //     description: "Label content (string or React.Node)",
        //     control: { type: "text" },
        // },
        // labelClassName: {
        //     table: { type: { summary: "string | undefined" } },
        //     description:
        //         "ClassName for label, which will be passed to Text component",
        //     control: { type: "text" },
        // },
        // name: {
        //     table: { type: { summary: "string | undefined" } },
        //     description:
        //         "Input attribute value. Is used as one of the ways to bind input tag with its label",
        //     control: { type: "text" },
        // },
        // className: {
        //     table: { type: { summary: "string | undefined" } },
        //     description: "ClassName for external tag of the component",
        //     control: { type: "text" },
        // },
        // onChange: {
        //     table: { type: { summary: "function | undefined" } },
        //     description:
        //         "Callback function, which will be called as a part of onChange and onKeyDown",
        //     control: { type: null },
        // },
        // id: {
        //     table: { type: { summary: "string | undefined" } },
        //     description:
        //         "Input attribute value. Is used as one of the ways to bind input tag with its label",
        //     control: { type: "text" },
        // },
        // ref: {
        //     description: "Reference for direct manipulations",
        //     control: { type: null },
        // },
    },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultDatePicker: Story = {};
