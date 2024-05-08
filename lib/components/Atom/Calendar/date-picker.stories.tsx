import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Text } from "@components/Typography";
import {
    LabelPairedChevronsRightSmFillIcon,
    LabelPairedChevronsLeftSmFillIcon,
} from "@deriv/quill-icons";
import { DatePicker } from "./index";

type Template = React.ComponentProps<typeof DatePicker>;

const meta = {
    title: "Components/Atom/DatePicker",
    component: DatePicker,
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component:
                    "*NOTE: this component was created with the help of React Calendar library. [Repository link](https://github.com/wojtekmaj/react-calendar)",
            },
        },
    },
    tags: ["autodocs"],
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
                "Function called to override default formatting of months and years. Can be used to use your own formatting function. Default formatter: (locale, date) => new Date(date).toLocaleString(locale || navigator.languages, { month: 'short', year: 'numeric' })`. Example: (locale, date) => formatDate(date, 'MMMM YYYY')",
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
            options: ["off", "polite", "assertive"],
            control: { type: "radio" },
        },
        navigationLabel: {
            table: {
                type: {
                    summary:
                        "(({date: Date, label: string, locale: string | undefined, view: 'century' | 'decade' | 'year' | 'month'}) => React.ReactNode) | undefined",
                },
            },
            description:
                "Content of a label rendered on calendar navigation bar.",
            control: { type: null },
        },
        next2AriaLabel: {
            table: {
                type: { summary: "string | undefined" },
            },
            description:
                "aria-label attribute of the 'next on higher level' button on the navigation pane. Example: 'Jump forwards'",
            control: { type: "text" },
        },
        next2Label: {
            table: {
                type: {
                    summary:
                        "string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null",
                },
            },
            description:
                "Content of the 'next on higher level' button on the navigation pane. Setting the value explicitly to null will hide the icon. Default value: null. Example: String: '»'",
            control: { type: "text" },
        },
        nextAriaLabel: {
            table: {
                type: { summary: "string | undefined" },
            },
            description:
                "aria-label attribute of the 'next' button on the navigation pane. Example: 'Next'",
            control: { type: "text" },
        },
        nextLabel: {
            table: {
                type: {
                    summary:
                        "string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null",
                },
            },
            description:
                "Content of the 'next' button on the navigation pane. Setting the value explicitly to null will hide the icon. Default value: LabelPairedChevronRightSmFillIcon. Example: String: '>'",
            control: { type: "text" },
        },
        optionsConfig: {
            table: {
                type: {
                    summary: "Record<string | string> | undefined",
                },
            },
            description:
                "Config for changing format of the selected date, will be passed inside of Date.toLocaleDateString(). Default value: {day: '2-digit', month: '2-digit', year: 'numeric'}",
            control: { type: null },
        },
        onActiveStartDateChange: {
            table: {
                type: {
                    summary:
                        "(({ action: 'prev' | 'prev2' | 'next' | 'next2' | 'onChange' | 'drillUp' | 'drillDown', activeStartDate: date | null, value: Date | null, view: 'century' | 'decade' | 'year' | 'month' }) => void) | undefined",
                },
            },
            description:
                "Function called when the user navigates from one view to another using previous/next button. Note that this function will not be called when e.g. drilling up from January 2021 to 2021 or drilling down the other way around. action signifies the reason for active start date change and can be one of the following values: 'prev', 'prev2', 'next', 'next2', 'drillUp', 'drillDown', 'onChange'. Example: ({ action, activeStartDate, value, view }) => alert('Changed view to: ', activeStartDate, view)",
            control: { type: null },
        },
        onChange: {
            table: {
                type: {
                    summary:
                        "((value: Date | null | (Date | null)[], event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined",
                },
            },
            description:
                "Function called when the user clicks an item (day on month view, month on year view and so on) on the most detailed view available.",
            control: { type: null },
        },
        onFormattedDate: {
            table: {
                type: {
                    summary: "((value: string) => void) | undefined",
                },
            },
            description:
                "Function called when the user clicks an item (day on month view, month on year view and so on) on the most detailed view available, will be called together with onChange. Returns formatted chosen date (single or range).",
            control: { type: null },
        },
        prev2AriaLabel: {
            table: {
                type: { summary: "string | undefined" },
            },
            description:
                "aria-label attribute of the 'previous on higher level' button on the navigation pane. Example: 'Jump backwards'",
            control: { type: "text" },
        },
        prev2Label: {
            table: {
                type: {
                    summary:
                        "string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null",
                },
            },
            description:
                "Content of the 'previous on higher level' button on the navigation pane. Setting the value explicitly to null will hide the icon. Default value: null. Example: String: '«'",
            control: { type: "text" },
        },
        prevAriaLabel: {
            table: {
                type: { summary: "string | undefined" },
            },
            description:
                "aria-label attribute of the 'previous' button on the navigation pane. Example: 'Previous'",
            control: { type: "text" },
        },
        prevLabel: {
            table: {
                type: {
                    summary:
                        "string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null",
                },
            },
            description:
                "Content of the 'previous' button on the navigation pane. Setting the value explicitly to null will hide the icon. Default value: LabelPairedChevronLeftSmFillIcon. Example: String: '<'",
            control: { type: "text" },
        },
        returnValue: {
            table: {
                type: {
                    summary: "'start' | 'end' | 'range' | undefined",
                },
            },
            description:
                "Which dates shall be passed by the calendar to the onChange function and onClick{Period} functions. Can be 'start', 'end' or 'range'. The latter will cause an array with start and end values to be passed. Default value: 'start'.",
            control: { type: "text" },
        },
        selectRange: {
            table: {
                type: {
                    summary: "boolean | undefined",
                },
            },
            description:
                "Whether the user shall select two dates forming a range instead of just one. Note: This feature will make react-calendar return array with two dates regardless of returnValue setting. Default value: false.",
            options: ["true", "false"],
            control: { type: "boolean" },
        },
        showNavigation: {
            table: {
                type: {
                    summary: "boolean | undefined",
                },
            },
            description:
                "Whether a navigation bar with arrows and title shall be rendered. Default value: true.",
            options: ["true", "false"],
            control: { type: "boolean" },
        },
        showNeighboringMonth: {
            table: {
                type: {
                    summary: "boolean | undefined",
                },
            },
            description:
                "Whether days from previous or next month shall be rendered if the month doesn't start on the first day of the week or doesn't end on the last day of the week, respectively. Default value: false.",
            options: ["true", "false"],
            control: { type: "boolean" },
        },
        tileClassName: {
            table: {
                type: {
                    summary: "string | undefined",
                },
            },
            description:
                "Class name(s) that will be applied to a given calendar item (day on month view, month on year view and so on).",
            control: { type: "text" },
        },
    },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template: React.FC<Template> = ({ ...args }: Template) => {
    const [date, setDate] = useState<Template["value"]>(new Date());
    const [formattedDate, setFormattedDate] = useState("");

    return (
        <>
            <Text as="div">Selected date: {formattedDate}</Text>
            <DatePicker
                {...args}
                value={date}
                onChange={(value) => setDate(value)}
                onFormattedDate={(value) => setFormattedDate(value)}
            />
        </>
    );
};
export const DefaultDatePicker = Template.bind(this) as Story;
DefaultDatePicker.args = {};

export const DatePickerWithRangeSelection = Template.bind(this) as Story;
DatePickerWithRangeSelection.args = {
    selectRange: true,
};

export const DatePickerWithDoubleNavigation = Template.bind(this) as Story;
DatePickerWithDoubleNavigation.args = {
    next2Label: (
        <LabelPairedChevronsRightSmFillIcon fill="var(--component-textIcon-normal-prominent)" />
    ),
    prev2Label: (
        <LabelPairedChevronsLeftSmFillIcon fill="var(--component-textIcon-normal-prominent)" />
    ),
};

export const DatePickerWithCustomConfigForFormattingSelectedDate =
    Template.bind(this) as Story;
DatePickerWithCustomConfigForFormattingSelectedDate.args = {
    optionsConfig: {
        day: "numeric",
        month: "short",
        year: "numeric",
    },
};

export const DatePickerWithCustomMonthAndYearFormatting = Template.bind(
    this,
) as Story;
DatePickerWithCustomMonthAndYearFormatting.args = {
    formatMonthYear: (locale, date) =>
        new Date(date).toLocaleString(locale || navigator.languages, {
            month: "2-digit",
            year: "2-digit",
        }),
};

export const DatePickerWithoutNavigation = Template.bind(this) as Story;
DatePickerWithoutNavigation.args = {
    showNavigation: false,
};

export const DatePickerWithNeighboringMonth = Template.bind(this) as Story;
DatePickerWithNeighboringMonth.args = {
    showNeighboringMonth: true,
};

export const DatePickerWithCustomActiveStartDate = Template.bind(this) as Story;
DatePickerWithCustomActiveStartDate.args = {
    activeStartDate: new Date(2017, 0, 1),
};

export const DatePickerGregoryType = Template.bind(this) as Story;
DatePickerGregoryType.args = {
    calendarType: "gregory",
};

export const DatePickerIslamicType = Template.bind(this) as Story;
DatePickerIslamicType.args = {
    calendarType: "islamic",
};
