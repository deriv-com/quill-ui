import { Meta, StoryObj } from "@storybook/react";
import InputPhoneNumber from ".";
import { StandaloneCircleUserRegularIcon } from "@deriv/quill-icons";
import { TCountryCodes } from "@types";

const icons: Record<string, object | null> = {
    with_icon: (
        <StandaloneCircleUserRegularIcon
            iconSize="sm"
            fill="var(--component-textIcon-normal-default)"
        />
    ),
    none: null,
};

const message = "message goes here";
const dummyList: TCountryCodes[] = [
    {
        name: "United States",
        short_code: "us",
        phone_code: "+1",
    },
    {
        name: "Canada",
        short_code: "CA",
        phone_code: "+1",
    },
    {
        name: "United Kingdom",
        short_code: "GB",
        phone_code: "+44",
    },
    {
        name: "Australia",
        short_code: "AU",
        phone_code: "+61",
    },
    {
        name: "Srilanka",
        short_code: "LK",
        phone_code: "+94",
    },
];

const meta = {
    title: "Components/Inputs/Input Phone Number",
    component: InputPhoneNumber,
    tags: ["autodocs"],
    parameters: {
        docs: {
            story: {
                height: "350px",
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 400 }}>
                <Story />
            </div>
        ),
    ],
    args: {
        codeLabel: "Code",
        inputSize: "md",
        status: "neutral",
        disabled: false,
        variant: "outline",
        fieldMarker: false,
        required: false,
        show_counter: false,
        shortCode: "au",
        fillAddonBorderColor:
            "var(--semantic-color-slate-solid-surface-frame-mid)",
        countryCodes: dummyList,
        showFlags: true,
        onCodeChange: (item) => {
            console.log("selected: ", item);
        },
        onValueChange: (number) => {
            console.log("phone number: ", number);
        },
        onChange: (e) => {
            console.log("input value: ", e.target.value);
        },
    },
    argTypes: {
        inputSize: {
            control: {
                type: "radio",
            },
            options: ["sm", "md"],
        },
        countryCodes: {
            description:
                "List of countries in the dropdown. please follow the object consist of `name, short_code, phone_code`",
        },
        shortCode: {
            description: "Default selected short code of the country.",
        },
        fillAddonBorderColor: {
            control: {
                type: "text",
            },
            description:
                "This is an optional prop only for fill variant addon border color. Pass the background color of the container to have the same border style as design.",
        },
        maxLength: {
            control: {
                type: "number",
            },
        },
        status: {
            control: {
                type: "radio",
            },
            options: ["neutral", "success", "error"],
        },
        variant: {
            control: {
                type: "radio",
            },
            options: ["fill", "outline"],
        },
        rightIcon: {
            options: Object.keys(icons),
            mapping: icons,
            control: {
                type: "select",
            },
        },
        label: {
            control: {
                type: "text",
            },
        },
        message: {
            control: {
                type: "text",
            },
        },
    },
} satisfies Meta<typeof InputPhoneNumber>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Outline: Story = {
    args: {
        label: "Outline",
        placeholder: "Placeholder",
        message: message,
    },
};
export const Fill: Story = {
    args: {
        label: "Fill",
        placeholder: "Placeholder",
        variant: "fill",
        message: message,
    },
};
