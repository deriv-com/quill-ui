import type { Meta } from "@storybook/react";
import MockTab from "./mocks/index";
import { StandalonePlaceholderRegularIcon } from "@deriv/quill-icons";
import { ComponentProps } from "react";

const meta = {
    title: "Components/Tab/Tab",
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
export const TabWithIconsOnLeftFill = (
    args: ComponentProps<typeof MockTab>,
) => (
    <MockTab
        {...args}
        iconPosition="left"
        icon={placeholder[args?.size as keyof typeof placeholder]}
    />
);
export const TabWithIconsOnTopFill = (args: ComponentProps<typeof MockTab>) => (
    <MockTab
        {...args}
        iconPosition="top"
        icon={placeholder[args?.size as keyof typeof placeholder]}
    />
);
export const TabWithoutIconsFill = (args: ComponentProps<typeof MockTab>) => (
    <MockTab {...args} />
);
export const TabWithIconsOnLeftHug = (args: ComponentProps<typeof MockTab>) => (
    <MockTab {...args} tabContent="hug" />
);
