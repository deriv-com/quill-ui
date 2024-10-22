import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StandalonePlaceholderRegularIcon } from "@deriv/quill-icons/Standalone";
import { fn } from "@storybook/test";
import { Snackbar } from "./snackbar";
import { Button } from "@components/Button";
import { SnackbarController } from "./snackbar-controller";
import {
    Title,
    Subtitle,
    Description,
    Primary,
    Controls,
    Stories,
    Markdown,
} from "@storybook/blocks";
import { useSnackbar } from "@hooks/useSnackbar";
import { SnackbarProvider } from "@providers/snackbar/snackbarProvider";

const icons: Record<string, object | null> = {
    with_icon: <StandalonePlaceholderRegularIcon iconSize="sm" />,
    none: null,
};

const meta = {
    title: "Components/Snackbar/Default",
    component: Snackbar,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    args: {
        id: "",
        isVisible: true,
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
            options: Object.keys(icons),
            mapping: icons,
            control: "radio",
        },
        id: {
            description:
                "Required. However, unique id is already set in Provider.",
            control: false,
        },
        isVisible: {
            description:
                "Required. This boolean is set and controlled by Provider. ",
            control: false,
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
        onCloseAction: {
            table: { disable: true },
        },
    },
    decorators: [
        (Story) => (
            <SnackbarProvider>
                <SnackbarController />
                <Story />
            </SnackbarProvider>
        ),
    ],
    parameters: {
        docs: {
            story: {
                height: "200px",
            },
            page: () => (
                <>
                    <Markdown>
                        {`#How to use snackbar component
First import SnackbarProvider and SnackbarController in root of your application and wrap SnackbarController inside SnackbarProvider as shown below.

\`\`\`javascript
import { SnackbarProvider } from "@providers/snackbar/snackbarProvider";
import { SnackbarController } from "@components/Snackbar";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <div className="quill__background--primary__type--base">
                <SnackbarProvider>
                    <SnackbarController />
                    .....Other Components
                </SnackbarProvider>
            </div>
        </ThemeProvider>
    </React.StrictMode>,
);
\`\`\`

To add snackbar anywhere in your application, import addSnackbar function from useSnackbar hook and customize your snackbar by providing desired props.

\`\`\`javascript
import { useSnackbar } from "@hooks/useSnackbar";

const { addSnackbar } = useSnackbar();

<Button 
    size="lg" 
    label="Add Snackbar"
    onClick={() => {
        addSnackbar({
            icon: <StandalonePlaceholderRegularIcon fill="#ffffff" iconSize="sm" />,
            message: "Message goes here",
            actionText: "Action",
            onActionClick: {() => ()},
            hasCloseButton: true,
        });
    }}
/>
\`\`\`
`}
                    </Markdown>
                    <Title />
                    <Subtitle />
                    <Description />
                    <Primary />
                    <Controls />
                    <Stories />
                </>
            ),
        },
    },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = ({ ...rest }: React.ComponentProps<typeof Snackbar>) => {
    const { addSnackbar } = useSnackbar();

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
                size="lg"
                label="Add Snackbar"
                style={{ margin: "0 auto" }}
                onClick={() => {
                    addSnackbar({
                        ...rest,
                    });
                }}
            />
        </div>
    );
};

export const defaultSnackbar = Template.bind(this) as Story;
defaultSnackbar.args = { ...meta.args };

export const SnackbarWithMessageOnly = Template.bind(this) as Story;
SnackbarWithMessageOnly.args = {
    ...meta.args,
    icon: "",
    hasCloseButton: false,
    actionText: "",
};

export const SnackbarWithIcon = Template.bind(this) as Story;
SnackbarWithIcon.args = {
    ...meta.args,
    icon: <StandalonePlaceholderRegularIcon iconSize="sm" />,
    hasCloseButton: false,
    actionText: "",
};

export const SnackbarWithAction = Template.bind(this) as Story;
SnackbarWithAction.args = {
    ...meta.args,
    icon: "",
    hasCloseButton: false,
    actionText: "Action",
    onActionClick: fn(),
};

export const SnackbarWithCloseButton = Template.bind(this) as Story;
SnackbarWithCloseButton.args = {
    ...meta.args,
    icon: "",
    actionText: "",
};

export const SnackbarWithTwoLinesMessageMobileOnly = Template.bind(
    this,
) as Story;
SnackbarWithTwoLinesMessageMobileOnly.args = {
    ...meta.args,
    icon: "",
    message:
        "This is an extremely long text that goes on another line. Lorem ipsum lorem lorem. Lorem ipsum lorem lorem. Lorem ipsum lorem lorem.",
    hasCloseButton: false,
    actionText: "",
};

export const SnackbarWithTwoLinesMessageWithCloseButtonMobileOnly =
    Template.bind(this) as Story;
SnackbarWithTwoLinesMessageWithCloseButtonMobileOnly.args = {
    ...meta.args,
    icon: "",
    message:
        "This is an extremely long text that goes on another line. Lorem ipsum lorem lorem.",
    actionText: "",
};

export const SnackbarWithTwoLinesMessageWithActionButtonMobileOnly =
    Template.bind(this) as Story;
SnackbarWithTwoLinesMessageWithActionButtonMobileOnly.args = {
    ...meta.args,
    icon: "",
    message:
        "This is an extremely long text that goes on another line. Lorem ipsum lorem lorem.",
    actionText: "Action",
    hasCloseButton: false,
    onActionClick: fn(),
};

export const SnackbarWithoutFixedHeight = Template.bind(this) as Story;
SnackbarWithoutFixedHeight.args = {
    ...meta.args,
    hasFixedHeight: false,
    message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit, leo sed viverra consequat, quam nulla maximus est, et faucibus nunc urna sit amet ex. Donec sagittis fermentum finibus.",
};

export const SnackbarWithRemoveCallback = Template.bind(this) as Story;
SnackbarWithRemoveCallback.args = {
    ...meta.args,
    message: "Please, open the console",
    onSnackbarRemove: () => console.log("onSnackbarRemove was called"),
};

export const VictorClicksHere = Template.bind(this) as Story;
VictorClicksHere.args = {
    ...meta.args,
    hasFixedHeight: false,
    message:
        "Hi Victor! This is a hardcoded snackbar, it will disappear in 8s. For implementing it, we need to fix Quill component first, but I've almost did it.",
    delay: 8000,
    actionText: "View",
    onActionClick: () => window.open("https://theuselessweb.com/"),
};
