import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./index";

const meta = {
    title: "Components/Atom/DatePicker",
    component: DatePicker,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "*NOTE: this component was created with the help of React Component library. [Repository Link](https://github.com/wojtekmaj/react-calendar)",
            },
        },
    },
    tags: ["autodocs"],
    args: {},
    argTypes: {
        activeStartDate: {
            table: { type: { summary: "Date | undefined" } },
            description:
                "The beginning of a period that shall be displayed. If you wish to use react-calendar in an uncontrolled way, use defaultActiveStartDate instead. Default value - today. Example values: new Date(2017, 0, 1).",
            control: { type: null },
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
                "Type of calendar that should be used. Can be 'gregory', 'hebrew', 'islamic', 'iso8601'. Setting to 'gregory' or 'hebrew' will change the first day of the week to Sunday. Setting to 'islamic' will change the first day of the week to Saturday. Setting to 'islamic' or 'hebrew' will make weekends appear on Friday to Saturday. Default value - type of calendar most commonly used in a given locale.",
            options: ["gregory", "hebrew", "islamic", "iso8601"],
            control: { type: "radio" },
        },
        className: {
            table: { type: { summary: "string | undefined" } },
            description:
                "Class name(s) that will be added along with 'react-calendar' to the main react-calendar <div> element.",
            control: { type: "text" },
        },
        defaultActiveStartDate: {
            table: { type: { summary: "Date | undefined" } },
            description:
                "The beginning of a period that shall be displayed by default. If you wish to use react-calendar in a controlled way, use activeStartDate instead. Default value - today. Example values: new Date(2017, 0, 1).",
            control: { type: null },
        },
        defaultValue: {
            table: { type: { summary: "Date | Date[] | undefined" } },
            description:
                "Calendar value that shall be selected initially. Can be either one value or an array of two values. If you wish to use react-calendar in a controlled way, use value instead. Example values: new Date(2017, 0, 1) or [new Date(2017, 0, 1), new Date(2017, 7, 1)].",
            control: { type: null },
        },
        defaultView: {
            table: {
                type: {
                    summary:
                        "'month'| 'year'| 'decade' | 'century' | undefined",
                },
            },
            description:
                "Determines which calendar view shall be opened initially. Does not disable navigation. Can be 'month', 'year', 'decade' or 'century'. If you wish to use react-calendar in a controlled way, use view instead. Default value - The most detailed view allowed.",
            options: ["month", "year", "decade", "century"],
            control: { type: "radio" },
        },
        formatDay: {
            table: {
                type: {
                    summary:
                        "((locale: string | undefined, date: Date) => string) | undefined",
                },
            },
            description:
                "Function called to override default formatting of day tile labels. Can be used to use your own formatting function. Default formatter is used if nothing was passed. Example: (locale, date) => formatDate(date, 'd')",
            control: { type: null },
        },
        formatLongDate: {
            table: {
                type: {
                    summary:
                        "((locale: string | undefined, date: Date) => string) | undefined",
                },
            },
            description:
                "Function called to override default formatting of day tile abbr labels. Can be used to use your own formatting function. Default formatter is used if nothing was passed. Example: (locale, date) => formatDate(date, 'dd MMM YYYY')",
            control: { type: null },
        },
        formatMonth: {
            table: {
                type: {
                    summary:
                        "((locale: string | undefined, date: Date) => string) | undefined",
                },
            },
            description:
                "Function called to override default formatting of month names. Can be used to use your own formatting function. Default formatter is used if nothing was passed. Example: (locale, date) => formatDate(date, 'MMM')",
            control: { type: null },
        },
        formatMonthYear: {
            table: {
                type: {
                    summary:
                        "((locale: string | undefined, date: Date) => string) | undefined",
                },
            },
            description:
                "Function called to override default formatting of months and years. Can be used to use your own formatting function. Default formatter is used if nothing was passed. Example: (locale, date) => formatDate(date, 'MMMM YYYY')",
            control: { type: null },
        },
        formatShortWeekday: {
            table: {
                type: {
                    summary:
                        "((locale: string | undefined, date: Date) => string) | undefined",
                },
            },
            description:
                "Function called to override default formatting of weekday names (shortened). Can be used to use your own formatting function. Default formatter is used if nothing was passed. Example: (locale, date) => formatDate(date, 'dd')",
            control: { type: null },
        },
        formatWeekday: {
            table: {
                type: {
                    summary:
                        "((locale: string | undefined, date: Date) => string) | undefined",
                },
            },
            description:
                "Function called to override default formatting of weekday names. Can be used to use your own formatting function. Default formatter is used if nothing was passed. Example: (locale, date) => formatDate(date, 'dd')",
            control: { type: null },
        },
        formatYear: {
            table: {
                type: {
                    summary:
                        "((locale: string | undefined, date: Date) => string) | undefined",
                },
            },
            description:
                "Function called to override default formatting of year in the top navigation section. Can be used to use your own formatting function. Default formatter is used if nothing was passed. Example: (locale, date) => formatDate(date, 'YYYY')",
            control: { type: null },
        },
        goToRangeStartOnSelect: {
            table: { type: { summary: "boolean | undefined" } },
            description:
                "Whether to go to the beginning of the range when selecting the end of the range. Default value - true.",
            options: ["true", "false"],
            control: { type: "boolean" },
        },
        inputRef: {
            table: {
                type: { summary: "React.Ref<HTMLDivElement> | undefined" },
            },
            description:
                "A prop that behaves like ref, but it's passed to main 'div' rendered by 'Calendar' component.",
            control: { type: null },
        },
        locale: {
            table: {
                type: { summary: "string | undefined" },
            },
            description:
                "Locale that should be used by the calendar. Can be any IETF language tag. Note: When using SSR, setting this prop may help resolving hydration errors caused by locale mismatch between server and client. Default value: server locale/User's browser settings. Example: 'hu-HU'.",
            control: { type: "text" },
        },
        maxDate: {
            table: { type: { summary: "Date | undefined" } },
            description:
                "Maximum date that the user can select. Periods partially overlapped by maxDate will also be selectable, although react-calendar will ensure that no later date is selected. Example values: new Date().",
            control: { type: null },
        },
        maxDetail: {
            table: {
                type: {
                    summary:
                        "'month'| 'year'| 'decade' | 'century' | undefined",
                },
            },
            description:
                "The most detailed view that the user shall see. View defined here also becomes the one on which clicking an item will select a date and pass it to onChange. Can be 'month', 'year', 'decade' or 'century'. Default value - 'month'.",
            options: ["month", "year", "decade", "century"],
            control: { type: "radio" },
        },
        minDate: {
            table: { type: { summary: "Date | undefined" } },
            description:
                "Minimum date that the user can select. Periods partially overlapped by minDate will also be selectable, although react-calendar will ensure that no earlier date is selected. Example values: new Date().",
            control: { type: null },
        },
        minDetail: {
            table: {
                type: {
                    summary:
                        "'month'| 'year'| 'decade' | 'century' | undefined",
                },
            },
            description:
                "The least detailed view that the user shall see. Default value - 'century'.",
            options: ["month", "year", "decade", "century"],
            control: { type: "radio" },
        },
        navigationAriaLabel: {
            table: {
                type: { summary: "string | undefined" },
            },
            description:
                "aria-label attribute of a label rendered on calendar navigation bar. Example: 'Go up'.",
            control: { type: "text" },
        },
        navigationAriaLive: {
            table: {
                type: { summary: "'off' | 'polite' | 'assertive' | undefined" },
            },
            description:
                "aria-live attribute of a label rendered on calendar navigation bar. Example: 'polite'.",
            control: { type: "radio" },
        },
    },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultDatePicker: Story = {
    args: {},
};
