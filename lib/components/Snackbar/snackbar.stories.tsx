import React from "react";
import type { Meta } from "@storybook/react";
import { StandalonePlaceholderRegularIcon } from "@deriv/quill-icons/Standalone";
import { fn } from "@storybook/test";
import { Snackbar } from ".";
import { useSnackbar } from "../../hooks/useSnackbar";
import { Button } from "../Button";
import { SnackbarProvider } from "../../providers/snackbar/snackbarProvider";

const meta = {
    title: "Components/Snackbar/Snackbar",
    component: Snackbar,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    args: {
        icon: <StandalonePlaceholderRegularIcon fill="#ffffff" iconSize="sm" />,
        message: "Message goes here",
        actionText: "Action",
        onActionClick: fn(),
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
        hasCloseButton: {
            control: "boolean",
            description: "Optional. Set to true by default.",
        },
    },
    decorators: [
        (Story) => (
            <SnackbarProvider>
                <Story />
            </SnackbarProvider>
        ),
    ],
    parameters: {
        docs: {
            story: {
                height: "200px",
            },
        },
    },
} satisfies Meta<typeof Snackbar>;

export default meta;

const Template = ({
    icon,
    message,
    actionText,
    onActionClick,
    hasCloseButton,
}: React.ComponentProps<typeof Snackbar>) => {
    const { queue: SnackbarQueue, addSnackbar } = useSnackbar();

    return (
        <>
            <>{SnackbarQueue[0]}</>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                    size="lg"
                    label={"Add Snackbar"}
                    style={{ margin: "0 auto" }}
                    onClick={() => {
                        addSnackbar({
                            message: message,
                            icon: icon,
                            hasCloseButton: hasCloseButton,
                            actionText: actionText,
                            onActionClick: onActionClick,
                        });
                    }}
                />
            </div>
        </>
    );
};

export const defaultSnackbar = Template.bind(this, meta.args);

export const SnackbarWithMessageOnly = Template.bind(this, {
    ...meta.args,
    icon: "",
    hasCloseButton: false,
    actionText: "",
});

export const SnackbarWithIcon = Template.bind(this, {
    ...meta.args,
    icon: <StandalonePlaceholderRegularIcon fill="#ffffff" iconSize="sm" />,
    hasCloseButton: false,
    actionText: "",
});

export const SnackbarWithAction = Template.bind(this, {
    ...meta.args,
    icon: "",
    hasCloseButton: false,
    actionText: "Action",
    onActionClick: fn(),
});

export const SnackbarWithCloseButton = Template.bind(this, {
    ...meta.args,
    icon: "",
    actionText: "",
});

export const SnackbarWithTwoLinesMessage = Template.bind(this, {
    ...meta.args,
    icon: "",
    message:
        "This is an extremely long text that goes on another line. Lorem ipsum lorem lorem. Lorem ipsum lorem lorem. Lorem ipsum lorem lorem.",
    hasCloseButton: false,
    actionText: "",
});

export const SnackbarWithTwoLinesMessageWithCloseButton = Template.bind(this, {
    ...meta.args,
    icon: "",
    message:
        "This is an extremely long text that goes on another line. Lorem ipsum lorem lorem.",
    actionText: "",
});

export const SnackbarWithTwoLinesMessageWithActionButton = Template.bind(this, {
    ...meta.args,
    icon: "",
    message:
        "This is an extremely long text that goes on another line. Lorem ipsum lorem lorem.",
    actionText: "Action",
    hasCloseButton: false,
    onActionClick: fn(),
});
