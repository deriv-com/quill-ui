import { Meta } from "@storybook/react";
import SearchField from ".";
import { Status, Variants } from "../base";
import { ComponentProps, useState } from "react";

const placeholder = "Search";

const variants: Record<string, Variants> = {
    fill: "fill",
    outline: "outline",
};

const status: Record<string, Status> = {
    neutral: "neutral",
    success: "success",
    error: "error",
};

const leftStatusMessage = "Status message goes here";

const meta = {
    title: "Components/Inputs/Search Field",
    component: SearchField,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        type: "text",
        inputSize: "md",
        status: status.neutral,
        disabled: false,
        variant: variants.fill,
        textAlignment: "left",
        leftStatusMessage: ''
    },
    argTypes: {
        type: {
            control: {
                type: "text",
            },
            options: ["text", "email", "password"],
        },
        inputSize: {
            control: {
                type: "radio",
            },
            options: ["sm", "md"],
        },
        status: {
            control: {
                type: "radio",
            },
            options: Object.values(status),
        },
        variant: {
            control: {
                type: "radio",
            },
            options: Object.values(variants),
        },
        textAlignment: {
            control: {
                type: "radio",
            },
            options: ["left", "center"],
        },
        leftStatusMessage: {
            control: {
                type: "text",
            },
        },
        disabled: {
            control: {
                type: "boolean",
            },
        },
    },
} satisfies Meta<typeof SearchField>;

export default meta;

const Template = (args: ComponentProps<typeof SearchField>) => {
    const [value, setValue] = useState("");
    return (
        <SearchField
            {...args}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

export const DefaultSearchField = Template.bind({});

export const SuccessSearchField = Template.bind({});
//@ts-expect-error expected
SuccessSearchField.args = {
    variant: variants.outline,
    status: status.success,
} as ComponentProps<typeof SearchField>;

export const ErrorSearchField = Template.bind({});
//@ts-expect-error expected
ErrorSearchField.args = {
    variant: variants.outline,
    status: status.error,
};

export const DisabledSearchField = Template.bind({});
//@ts-expect-error expected
DisabledSearchField.args = {
    disabled: true,
    variant: variants.outline,
}

export const SuccessStatusIconSearchField = Template.bind({});
//@ts-expect-error expected
SuccessStatusIconSearchField.args = {
    variant: variants.outline,
    status: status.success,
}

export const SuccessMessageSearchFieldWithIcons = Template.bind({});
//@ts-expect-error expected
SuccessMessageSearchFieldWithIcons.args = {
    variant: variants.outline,
    status: status.success,
    leftStatusMessage,
}

export const ErrorMessageSearchFieldWithIcons = Template.bind({});
//@ts-expect-error expected
ErrorMessageSearchFieldWithIcons.args = {
    variant: variants.outline,
    status: status.error,
    leftStatusMessage,
}
