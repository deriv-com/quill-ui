import type { Meta } from "@storybook/react";
import MockTab from "@components/Tab/mocks/index";
import { StandalonePlaceholderRegularIcon } from "@deriv/quill-icons";
import { ComponentProps } from "react";

const meta = {
    title: "Components/Tab/Hug Content",
    component: MockTab,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        size: "sm",
    },
    argTypes: {
        size: {
            options: ["sm", "md"],
            control: { type: "radio" },
            description: "To select the size of icon and font-size",
        },
    },
} satisfies Meta<typeof MockTab>;

export default meta;

const placeholder = {
    sm: <StandalonePlaceholderRegularIcon iconSize="sm" />,
    md: <StandalonePlaceholderRegularIcon iconSize="md" />,
};

export const TabHugContentWithIconsOnLeft = (
    args: ComponentProps<typeof MockTab>,
) => (
    <MockTab
        {...args}
        tabContent="hug"
        icon={placeholder[args?.size as keyof typeof placeholder]}
    />
);
export const TabHugContentWithIconsOnTop = (
    args: ComponentProps<typeof MockTab>,
) => (
    <MockTab
        {...args}
        iconPosition="top"
        tabContent="hug"
        icon={placeholder[args?.size as keyof typeof placeholder]}
    />
);
export const TabHugContentWithoutIcons = (
    args: ComponentProps<typeof MockTab>,
) => <MockTab {...args} tabContent="hug" />;
