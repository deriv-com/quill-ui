import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import {
    LabelPairedPlaceholderCaptionBoldIcon,
    StandaloneCirclePlusBoldIcon,
} from "@deriv/quill-icons";
import { TYPE } from "@utils/notification-utils";
import NotificationBanner from ".";

const icons: Record<string, object | null> = {
    custom_icon: <LabelPairedPlaceholderCaptionBoldIcon />,
    default_icon: null,
};

const meta = {
    title: "Components/Notification/NotificationBanner",
    component: NotificationBanner,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        redirectTo: "https://www.example.com",
        message:
            "The redirectTo prop can be used to redirect to a desired page when the banner is clicked.",
        onClick: fn(),
        onClose: fn(),
        title: "Hint",
        isMobile: false,
        autohideTimeout: 50000,
    },
    argTypes: {
        className: {
            control: false,
            description: "Optional.",
            table: {
                type: { summary: "string | undefined" },
            },
        },
        icon: {
            description: "Optional. Custom icon component.",
            options: Object.keys(icons),
            mapping: icons,
            control: "radio",
            table: {
                type: { summary: "ReactNode | undefined" },
            },
        },
        iconBackgroundColor: {
            description:
                "Optional. Custom background color for the icon of the banner.",
            control: { type: "color" },
            table: {
                type: { summary: "string | undefined" },
                disable: true,
            },
        },
        isMobile: {
            control: { type: "boolean" },
            description: "Optional.",
            table: {
                type: { summary: "boolean | undefined" },
            },
        },
        message: {
            description: "Optional. Description message of the banner.",
            table: {
                type: { summary: "string | ReactNode | undefined" },
            },
        },
        redirectTo: {
            description:
                "Optional. Passed to href attribute of the anchor tag.",
        },
        title: {
            description: "Optional. Title of the banner.",
            table: {
                type: { summary: "string | ReactNode | undefined" },
            },
        },
        type: {
            options: [TYPE.INFO, TYPE.ERROR, TYPE.SUCCESS, TYPE.WARNING],
            control: { type: "radio" },
            description:
                "Optional. Defaults to `info`. Controls which icon to display. A custom icon can be passed using the `icon` prop. Icon background color can be customized using the `iconBackgroundColor`.",
            table: {
                type: {
                    summary:
                        "'info' | 'error' | 'success' | 'warning' | undefined",
                },
            },
        },
    },
} satisfies Meta<typeof NotificationBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotificationBannerDesktop: Story = {
    render: (args) => (
        <div style={{ maxWidth: "360px" }}>
            <NotificationBanner {...args} />
        </div>
    ),
};

export const NotificationBannerMobile: Story = {
    args: {
        isMobile: true,
    },
    render: (args) => (
        <div style={{ maxWidth: "360px" }}>
            <NotificationBanner {...args} />
        </div>
    ),
};

export const NotificationBannerDesktopWithCustomIcon: Story = {
    render: (args) => (
        <div>
            <NotificationBanner
                {...args}
                icon={
                    <StandaloneCirclePlusBoldIcon
                        fill="rgba(0, 130, 42, 1)"
                        iconSize="sm"
                    />
                }
                type={TYPE.SUCCESS}
            />
        </div>
    ),
};
