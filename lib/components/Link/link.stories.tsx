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

const meta = {
    title: "Components/Links/Link",
    component: Link,
    parameters: {
        layout: "centered",
    },
    args: {
        size: "md",
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
    sm: <LabelPairedPlaceholderSmRegularIcon />,
    md: <LabelPairedPlaceholderMdRegularIcon />,
    lg: <LabelPairedPlaceholderLgRegularIcon />,
    xl: <LabelPairedPlaceholderXlRegularIcon />,
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
        children="link"
        size="md"
        color="white"
        icon={<LabelPairedPlaceholderMdRegularIcon fill="#ffffff" />}
    />
);
