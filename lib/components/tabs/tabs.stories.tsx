import type { Meta } from "@storybook/react";
import {} from "@deriv/quill-icons/LabelPaired";
import MockTab from "./mocks/index";
import { StandalonePlaceholderRegularIcon } from "@deriv/quill-icons";
import { ComponentProps } from "react";

const meta = {
    title: "Components/Tabs",
    component: MockTab,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        size: "sm",
        iconPosition: "left",
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
export const TabWithIconsOnLeft = (args: ComponentProps<typeof MockTab>) => (
    <MockTab
        {...args}
        iconPosition="left"
        icon={placeholder[args?.size as keyof typeof placeholder]}
    />
);
export const TabWithIconsOnTop = (args: ComponentProps<typeof MockTab>) => (
    <MockTab
        {...args}
        iconPosition="top"
        icon={placeholder[args?.size as keyof typeof placeholder]}
    />
);
