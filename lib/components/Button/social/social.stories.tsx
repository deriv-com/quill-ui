import type { Meta, StoryObj } from "@storybook/react";
import SocialButton from ".";

const meta = {
    title: "Components/Button/Social",
    component: SocialButton,

    tags: ["autodocs"],
    args: {
        size: "md",
        hideLabel: false,
        disabled: false,
    },
    argTypes: {
        variant: {
            options: ["primary", "secondary"],
            control: { type: "radio" },
        },

        isLoading: {
            options: ["true", "false"],
            control: { type: "boolean" },
        },

        size: {
            options: ["md", "lg", "xl"],
            control: { type: "radio" },
        },

        onClick: {
            table: {
                disable: true,
            },
        },
        className: {
            table: {
                disable: true,
            },
        },
    },
    decorators: [
        (Story) => (
            <div className="flex min-h-[256px] min-w-[512px] items-center justify-center">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof SocialButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Google: Story = {
    args: {
        social: "google",
        variant: "primary",
    },
};

export const Facebook: Story = {
    args: {
        social: "facebook",
        variant: "primary",
    },
};

export const Apple: Story = {
    args: {
        social: "apple",
        variant: "primary",
    },
};
