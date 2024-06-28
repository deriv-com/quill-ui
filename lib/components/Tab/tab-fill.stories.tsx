import type { Meta } from "@storybook/react";
import MockTab from "@components/Tab/mocks/index";
import { StandalonePlaceholderRegularIcon } from "@deriv/quill-icons";
import { ComponentProps } from "react";

const icons: Record<string, object | null> = {
    sm: <StandalonePlaceholderRegularIcon iconSize="sm" />,
    md: <StandalonePlaceholderRegularIcon iconSize="md" />,
    none: null,
};

const meta = {
    title: "Components/Tab/Fill Content",
    component: MockTab,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        size: "sm",
        selectedTabIndex: 0,
    },
    argTypes: {
        size: {
            options: ["sm", "md"],
            control: "radio",
            description: "To select the size of icon and font-size",
        },
        className: { control: false },
        icon: {
            control: "radio",
            options: Object.keys(icons),
            mapping: icons,
        },
        onChangeTab: {
            description:
                "Function triggered when the tab changed. Will return index value of the current tab",
        },
        selectedTabIndex: {
            description: "Index value to control current active tab",
        },
        onTabClick: {
            description:
                "Function triggered onClick of each tab. Will trigger the function even click on the same tab",
        },
    },
} satisfies Meta<typeof MockTab>;

export default meta;

export const TabFillContentWithIconsOnLeft = (
    args: ComponentProps<typeof MockTab>,
) => <MockTab {...args} iconPosition="left" contentStyle="fill" />;
export const TabFillContentWithIconsOnTop = (
    args: ComponentProps<typeof MockTab>,
) => <MockTab {...args} iconPosition="top" contentStyle="fill" />;
export const TabFillContentWithoutIcons = (
    args: ComponentProps<typeof MockTab>,
) => <MockTab {...args} contentStyle="fill" />;
