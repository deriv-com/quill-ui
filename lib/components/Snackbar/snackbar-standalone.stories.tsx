import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StandalonePlaceholderRegularIcon } from "@deriv/quill-icons/Standalone";
import { Snackbar } from "./snackbar";

const icons: Record<string, object | null> = {
    with_icon: <StandalonePlaceholderRegularIcon iconSize="sm" />,
    none: null,
};

const meta = {
    title: "Components/Snackbar/Standalone",
    component: Snackbar,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    args: {
        icon: <StandalonePlaceholderRegularIcon iconSize="sm" />,
        isVisible: true,
        actionText: "",
        hasCloseButton: true,
    },
    parameters: {
        docs: {
            story: {
                height: "80px",
            },
        },
    },
    argTypes: {
        icon: {
            description:
                "Optional. There will be no icon if icon is not provided.",
            table: { type: { summary: "Reactnode | undefined" } },
            options: Object.keys(icons),
            mapping: icons,
            control: "radio",
        },
        id: { table: { disable: true } },
        isVisible: {
            description:
                "Required. This boolean is set and controlled by Provider. ",
        },
        message: {
            control: "text",
            description: "Required. Enter any message.",
        },
        actionText: {
            control: "text",
            description:
                "Optional. Action button will not be included if actionText is null or an empty string.",
            table: { type: { summary: "string | undefined" } },
        },
        onActionClick: {
            description:
                "Optional. Must be included if we have actionText to trigger action and close snackbar.",
        },
        onCloseAction: {
            description:
                "Optional. Only for standalone snackbar when you pass function for close button `onClick`.",
        },
        onSnackbarRemove: {
            description:
                "Optional. Callback for removing snackbar, will be triggered on close button click, on action text click, on timeout expiry and on dismissing the snackbar.",
        },
        hasCloseButton: {
            control: "boolean",
            description: "Optional. Set to true by default.",
        },
        hasFixedHeight: {
            control: "boolean",
            description: "Optional. Set to true by default.",
        },
    },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        message: "Message goes here",
    },
};

export const WithoutCloseButton: Story = {
    args: {
        message: "Message goes here",
        hasCloseButton: false,
    },
};

export const WithActionButton: Story = {
    args: {
        message: "Message goes here",
        actionText: "Action",
    },
};

export const WithRemoveCallback: Story = {
    args: {
        message: "Please, open the console",
        actionText: "Action",
        onSnackbarRemove: () => console.log("onSnackbarRemove was called"),
    },
};

export const WithoutFixedHeight: Story = {
    args: {
        icon: undefined,
        hasFixedHeight: false,
        message:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit, leo sed viverra consequat, quam nulla maximus est, et faucibus nunc urna sit amet ex. Donec sagittis fermentum finibus.",
    },
};
