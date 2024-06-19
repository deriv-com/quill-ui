import type { Meta, StoryObj } from "@storybook/react";
import Link from ".";
import {
    LabelPairedPlaceholderCaptionRegularIcon,
    LabelPairedPlaceholderLgRegularIcon,
    LabelPairedPlaceholderMdRegularIcon,
    LabelPairedPlaceholderSmRegularIcon,
    LabelPairedPlaceholderXlRegularIcon,
} from "@deriv/quill-icons/LabelPaired";
import { ComponentProps } from "react";
import "./link-stories.scss";

const meta = {
    title: "Components/Links/Link",
    component: Link,
    args: {
        size: "md",
        color: "black",
    },
    argTypes: {
        size: {
            options: ["caption", "sm", "md", "lg", "xl"],
            control: { type: "radio" },
            description: "To select the size of the link",
        },
        color: {
            options: ["black", "white"],
            control: { type: "radio" },
            description: "To select the color of the link",
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;
const placeholder = {
    caption: <LabelPairedPlaceholderCaptionRegularIcon />,
    sm: (
        <LabelPairedPlaceholderSmRegularIcon fill="var(--component-textIcon-normal-prominent)" />
    ),
    md: (
        <LabelPairedPlaceholderMdRegularIcon fill="var(--component-textIcon-normal-prominent)" />
    ),
    lg: (
        <LabelPairedPlaceholderLgRegularIcon fill="var(--component-textIcon-normal-prominent)" />
    ),
    xl: (
        <LabelPairedPlaceholderXlRegularIcon fill="var(--component-textIcon-normal-prominent)" />
    ),
};
const placeholderWhiteIcon = {
    caption: (
        <LabelPairedPlaceholderCaptionRegularIcon fill="var(--component-textIcon-inverse-prominent)" />
    ),
    sm: (
        <LabelPairedPlaceholderSmRegularIcon fill="var(--component-textIcon-inverse-prominent)" />
    ),
    md: (
        <LabelPairedPlaceholderMdRegularIcon fill="var(--component-textIcon-inverse-prominent)" />
    ),
    lg: (
        <LabelPairedPlaceholderLgRegularIcon fill="var(--component-textIcon-inverse-prominent)" />
    ),
    xl: (
        <LabelPairedPlaceholderXlRegularIcon fill="var(--component-textIcon-inverse-prominent)" />
    ),
};
export const DefaultBlackLink: Story = {
    args: {
        children: "link",
        size: "md",
        disabled: false,
        hasChevron: true,
        color: "black",
    },
};
export const DefaultWhiteLink: Story = {
    args: {
        className: "link-stories",
        children: "link",
        size: "md",
        color: "white",
        disabled: false,
        hasChevron: true,
    },
};

export const LinkWithIconBlack = (args: ComponentProps<typeof Link>) => (
    <Link
        {...args}
        children="link"
        color="black"
        icon={placeholder[args?.size as keyof typeof placeholder]}
    />
);
export const LinkWithIconWhite = (args: ComponentProps<typeof Link>) => (
    <Link
        {...args}
        className="link-stories"
        children="link"
        color="white"
        icon={
            placeholderWhiteIcon[
                args?.size as keyof typeof placeholderWhiteIcon
            ]
        }
    />
);
