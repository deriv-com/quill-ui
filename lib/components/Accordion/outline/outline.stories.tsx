import type { Meta, StoryObj } from "@storybook/react";
import { Outline } from ".";
import {
    StandaloneAndroidIcon,
    StandaloneAppStoreIcon,
    StandaloneIosIcon,
} from "@deriv/quill-icons/Standalone";
import H1 from "@components/Typography/heading/h1";

const meta = {
    title: "Components/Accordion/Outline",
    argTypes: {
        icon: {
            options: ["Android", "App Store", "IOS"],
            mapping: {
                Android: <StandaloneAndroidIcon />,
                "App Store": <StandaloneAppStoreIcon />,
                IOS: <StandaloneIosIcon />,
            },
        },
    },
    tags: ["autodocs"],
    component: Outline,
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof Outline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NoIcon: Story = {
    args: {
        title: "Accordion Outline",
        subtitle: "There is no icon in this accordion",
        content: () => (
            <img
                style={{ flexBasis: "1 1 0%", maxWidth: "100%" }}
                src="https://placehold.co/800x320"
                alt="Placeholder"
            />
        ),
    },
};

export const ShortContent: Story = {
    args: {
        icon: <StandaloneIosIcon />,
        title: "Accordion Outline",
        subtitle: "This is a test subtitle",
        divider: "both",
        content: () => (
            <img
                style={{ flexBasis: "1 1 0%", maxWidth: "100%" }}
                src="https://placehold.co/800x320"
                alt="Placeholder"
            />
        ),
    },
};

export const LongSubtitle: Story = {
    args: {
        icon: <StandaloneIosIcon />,
        title: "Accordion Outline (Long Subtitle)",
        subtitle:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        divider: "both",
        content: () => (
            <img
                style={{ flexBasis: "1 1 0%", maxWidth: "100%" }}
                src="https://placehold.co/800x320"
                alt="Placeholder"
            />
        ),
    },
};

export const LongContent: Story = {
    args: {
        icon: <StandaloneIosIcon />,
        title: "Accordion Outline (Long content)",
        subtitle: "This is a test subtitle",
        content: () => (
            <img
                style={{ flexBasis: "1 1 0%", maxWidth: "100%" }}
                src="https://placehold.co/800x1320"
                alt="Placeholder"
            />
        ),
    },
};

export const CustomContent: Story = {
    args: {
        customContent: () => (
            <>
                <H1>This is a custom content</H1>
            </>
        ),
        content: () => (
            <img
                style={{ flexBasis: "1 1 0%", maxWidth: "100%" }}
                src="https://placehold.co/800x400"
                alt="Placeholder"
            />
        ),
    },
};
