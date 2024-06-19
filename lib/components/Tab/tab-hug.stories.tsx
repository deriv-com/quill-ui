import type { Meta } from "@storybook/react";
import MockTab from "@components/Tab/mocks/index";
import { StandalonePlaceholderRegularIcon } from "@deriv/quill-icons";
import { ComponentProps } from "react";

const placeholder = {
    sm: <StandalonePlaceholderRegularIcon iconSize="sm" />,
    md: <StandalonePlaceholderRegularIcon iconSize="md" />,
    none: null,
};

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
        className: { control: false },
        icon: {
            control: "radio",
            options: Object.keys(placeholder),
            mapping: placeholder,
        },
    },
} satisfies Meta<typeof MockTab>;

export default meta;

export const TabHugContentWithIconsOnLeft = (
    args: ComponentProps<typeof MockTab>,
) => <MockTab {...args} contentStyle="hug" />;
export const TabHugContentWithIconsOnTop = (
    args: ComponentProps<typeof MockTab>,
) => <MockTab {...args} iconPosition="top" contentStyle="hug" />;
export const TabHugContentWithoutIcons = (
    args: ComponentProps<typeof MockTab>,
) => <MockTab {...args} contentStyle="hug" />;
