import type { Meta, StoryObj } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import NotificationBanners from ".";
import { TYPE } from "@utils/notification-utils";
import { NotificationsProvider } from "@providers/notification/notificationsProvider";
import { useNotifications } from "@hooks/useNotifications";
import { NotificationTestButtons } from "../test-buttons";

const meta = {
    title: "Components/Notification/NotificationBanners",
    component: NotificationBanners,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    parameters: {
        viewport: {
            viewports: {
                ...MINIMAL_VIEWPORTS,
                desktop: {
                    name: "desktop",
                    styles: {
                        width: "100%",
                        height: "100%",
                    },
                },
                iphoneSE: {
                    name: "iphoneSE",
                    styles: {
                        width: "375px",
                        height: "667px",
                    },
                },
            },
            defaultViewport: "desktop",
        },
        docs: {
            description: {
                component:
                    "*NOTE: You can wrap your app with `NotificationsProvider` and use `useNotifications()` hook available in this library for managing notifications state using context. The hook exports `banners` and methods for CRUD operations with NotificationBanners such as `addBanner`, `removeBanner` (by id), `updateBanners`.",
            },
        },
    },
    decorators: [
        (Story) => (
            <NotificationsProvider>
                <Story />
            </NotificationsProvider>
        ),
    ],
    args: {
        autohideTimeout: 4000,
    },
    argTypes: {
        className: {
            control: { type: null },
            description: "Optional.",
            table: {
                type: { summary: "string | undefined" },
            },
        },
        banners: {
            description:
                "Required. An array of NotificationBanners. Please refer to the NotificationBanner component docs for more details about props.",
            table: {
                type: {
                    summary: "Array<NotificationBannerProps & { id: string }>",
                },
            },
        },
    },
} satisfies Meta<typeof NotificationBanners>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicBanners = [
    {
        message: "This is an information message",
        redirectTo: "https://www.example.com",
        title: "Information",
        type: TYPE.INFO,
    },
    {
        message: "This is a warning message",
        redirectTo: "https://www.example.com",
        title: "Warning",
        type: TYPE.WARNING,
    },
    {
        message: "This is an error message",
        redirectTo: "https://www.example.com",
        title: "Error",
        type: TYPE.ERROR,
    },
];
const initialBanners = [...basicBanners, ...basicBanners];

const Template: Story = {
    render: (args) => {
        const { addBanner, banners, removeBanner } = useNotifications({
            banners: initialBanners,
        });

        return (
            <>
                <NotificationTestButtons
                    addNotification={addBanner}
                    shouldAddBanner
                />
                <NotificationBanners
                    {...args}
                    banners={banners}
                    onClose={removeBanner}
                />
            </>
        );
    },
};

export const NotificationBannersDesktop: Story = {
    ...Template,
    parameters: { viewport: { defaultViewport: "desktop" } },
};

export const NotificationBannersMobile: Story = {
    ...Template,
    args: {
        isMobile: true,
    },
    parameters: { viewport: { defaultViewport: "iphoneSE" } },
};
