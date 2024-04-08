import type { Meta, StoryObj } from "@storybook/react";
import { StandalonePlaceholderRegularIcon } from "@deriv/quill-icons/Standalone";
import { fn } from "@storybook/test";
import { Snackbar } from ".";

const meta = {
    title: "Components/Snackbar/Snackbar",
    component: Snackbar,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    args: {
        icon: <StandalonePlaceholderRegularIcon fill="#ffffff" iconSize="sm" />,
        message: "Message goes here",
        actionText: "Action",
        isOpen: false,
        onActionClick: fn(),
        onClose: fn(),
        hasCloseButton: true,
    },
    argTypes: {
        icon: {
            description:
                "Optional. There will be no icon if icon is not provided.",
            table: { type: { summary: "Reactnode | undefined" } },
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
        isOpen: {
            description:
                "Required. Controls opening and closing of snackbar. Should be set to false by default.",
            control: "boolean",
        },
        onClose: {
            description:
                "Required. Needed to close snackbar after a certain time.",
        },
        hasCloseButton: {
            control: "boolean",
            description: "Optional. Set to true by default.",
        },
    },
} satisfies Meta<typeof Snackbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const defaultSnackbar: Story = {
    parameters: {
        docs: {
            story: {
                height: '100px',
            }
        }
    }
};

export const SnackbarWithMessageOnly: Story = {
    args: {
        isOpen: true,
        icon: "",
        hasCloseButton: false,
        actionText: "",
    },
};

export const SnackbarWithIcon: Story = {
    args: {
        isOpen: true,
        icon: <StandalonePlaceholderRegularIcon fill="#ffffff" iconSize="sm" />,
        hasCloseButton: false,
        actionText: "",
    },
};

export const SnackbarWithAction: Story = {
    args: {
        isOpen: true,
        icon: "",
        hasCloseButton: false,
        actionText: "Action",
        onActionClick: fn(),
    },
};

export const SnackbarWithCloseButton: Story = {
    args: {
        isOpen: true,
        icon: "",
        actionText: "",
        onClose: fn(),
    },
};

export const SnackbarWithTwoLinesMessage: Story = {
    args: {
        isOpen: true,
        icon: "",
        message:
            "This is an extremely long text that goes on another line. Lorem ipsum lorem lorem. Lorem ipsum lorem lorem. Lorem ipsum lorem lorem.",
        hasCloseButton: false,
        actionText: "",
    },
};

export const SnackbarWithTwoLinesMessageWithCloseButton: Story = {
    args: {
        isOpen: true,
        icon: "",
        message:
            "This is an extremely long text that goes on another line. Lorem ipsum lorem lorem.",
        onClose: fn(),
        actionText: "",
    },
};

export const SnackbarWithTwoLinesMessageWithActionButton: Story = {
    args: {
        isOpen: true,
        icon: "",
        message:
            "This is an extremely long text that goes on another line. Lorem ipsum lorem lorem.",
        actionText: "Action",
        hasCloseButton: false,
        onActionClick: fn(),
    },
};
