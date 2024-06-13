import type { Meta, StoryObj } from "@storybook/react";
import { SectionMessage } from "./index";
import {
    StandaloneCircleUserRegularIcon,
    StandaloneAndroidIcon,
} from "@deriv/quill-icons/Standalone";

const icons = {
    sample_1: <StandaloneCircleUserRegularIcon iconSize="sm" />,
    sample_2: <StandaloneAndroidIcon iconSize="sm" />,
};

const data = [
    {
        id: 1,
        linkProps: {
            hasChevron: true,
            children: "Click here",
            href: "/",
        },
    },
    {
        id: 2,
        linkProps: {
            hasChevron: true,
            children: "Disabled Link",
            href: "/",
            disabled: true,
        },
    },
];

const links = {
    one: data.slice(0, 1),
    two: data,
    none: null,
};

const meta = {
    title: "Components/SectionMessage/SectionMessage",
    component: SectionMessage,
    argTypes: {
        size: {
            options: ["sm", "md"],
            control: "radio",
            description: "To select the size of the section-message",
        },
        status: {
            options: ["info", "success", "warning", "danger", null],
            control: { type: "radio" },
            description: "To select the status",
        },
        icon: {
            options: Object.keys(icons),
            mapping: icons,
            control: "radio",
        },
        linkList: {
            options: Object.keys(links),
            mapping: links,
            control: "radio",
        },
        className: { table: { disable: true } },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof SectionMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "Default",
        message: "This is a message",
        size: "md",
        icon: icons.with_icon,
    },
};

export const Info: Story = {
    args: {
        title: "Information",
        message: "This is an information message",
        size: "md",
        status: "info",
        linkList: [
            {
                id: 1,
                linkProps: {
                    hasChevron: true,
                    children: "Click here",
                    href: "/",
                },
            },
        ],
    },
};

export const Success: Story = {
    args: {
        title: "Success",
        message: "This is a success message",
        size: "md",
        status: "success",
        linkList: [
            {
                id: 1,
                linkProps: {
                    hasChevron: true,
                    children: "Click here",
                    href: "/",
                },
            },
            {
                id: 2,
                linkProps: {
                    hasChevron: true,
                    children: "Click here",
                    href: "/",
                    disabled: true,
                },
            },
        ],
    },
};

export const Danger: Story = {
    args: {
        title: "Danger",
        message: "This is a danger message",
        size: "md",
        status: "danger",
        linkList: [
            {
                id: 1,
                linkProps: {
                    hasChevron: true,
                    children: "Click here",
                    href: "/",
                },
            },
        ],
    },
};

export const Warning: Story = {
    args: {
        title: "Warning",
        message: "This is a warning message",
        size: "md",
        status: "warning",
    },
};
