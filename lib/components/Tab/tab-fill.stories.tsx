import type { Meta } from "@storybook/react";
import MockTab from "@components/Tab/mocks/index";
import { StandalonePlaceholderRegularIcon } from "@deriv/quill-icons";
import { ComponentProps } from "react";

const meta = {
    title: "Components/Tab/Fill Content",
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
export const TabFillContentWithIconsOnLeft = (
    args: ComponentProps<typeof MockTab>,
) => (
    <MockTab
        {...args}
        iconPosition="left"
        contentStyle="fill"
        icon={placeholder[args?.size as keyof typeof placeholder]}
    />
);
export const TabFillContentWithIconsOnTop = (
    args: ComponentProps<typeof MockTab>,
) => (
    <MockTab
        {...args}
        iconPosition="top"
        contentStyle="fill"
        icon={placeholder[args?.size as keyof typeof placeholder]}
    />
);
export const TabFillContentWithoutIcons = (
    args: ComponentProps<typeof MockTab>,
) => <MockTab {...args} contentStyle="fill" />;
