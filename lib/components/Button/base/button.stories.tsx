import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";

import {
    LabelPairedPlaceholderSmRegularIcon,
    LabelPairedPlaceholderMdRegularIcon,
    LabelPairedPlaceholderLgRegularIcon,
    LabelPairedPlaceholderXlRegularIcon,
} from "@deriv/quill-icons/LabelPaired";
import { ComponentProps } from "react";

const icons: Record<string, object | null> = {
    sm: <LabelPairedPlaceholderSmRegularIcon />,
    md: <LabelPairedPlaceholderMdRegularIcon />,
    lg: <LabelPairedPlaceholderLgRegularIcon />,
    none: null,
};

const meta = {
    title: "Components/Button/Basic",
    component: Button,
    tags: ["autodocs"],
    args: {
        variant: "primary",
        label: "Label",
        color: "coral",
        isLoading: false,
        disabled: false,
        fullWidth: false,
        type: "button",
        size: "md",
    },

    argTypes: {
        variant: {
            options: ["primary", "secondary", "tertiary"],
            control: "radio",
        },
        "aria-label": {
            table: {
                disable: true,
            },
        },
        isLoading: {
            options: ["true", "false"],
            control: "boolean",
        },
        iconPosition: {
            options: ["start", "end"],
            control: "radio",
        },
        size: {
            options: ["sm", "md", "lg", "xl"],
            control: "radio",
        },
        icon: {
            options: Object.keys(icons),
            mapping: icons,
            control: "radio",
        },
        color: {
            options: [
                "coral",
                "black",
                "white",
                "purchase",
                "sell",
                "black-white",
                "white-black",
            ],
            control: "radio",
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
        type: { control: false },
        dropdown: { table: { disable: true } },
        iconButton: { table: { disable: true } },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicPrimaryButton: Story = {
    args: {
        size: "xl",
        label: "Basic Primary Button",
    },
};
export const BasicSecondaryButton: Story = {
    args: {
        variant: "secondary",
        size: "xl",
        label: "Basic Secondary Button",
    },
};
export const BasicTertiaryButton: Story = {
    args: {
        variant: "tertiary",
        size: "xl",
        label: "Basic Teritary Button",
    },
};
const placeholder = {
    sm: <LabelPairedPlaceholderSmRegularIcon />,
    md: <LabelPairedPlaceholderMdRegularIcon />,
    lg: <LabelPairedPlaceholderLgRegularIcon />,
    xl: <LabelPairedPlaceholderXlRegularIcon />,
};

export const ButtonWithLabelIconAtStart = (
    args: ComponentProps<typeof Button>,
) => (
    <Button
        size="lg"
        iconPosition="start"
        icon={placeholder[args?.size as keyof typeof placeholder]}
        {...args}
    />
);
export const ButtonWithLabelIconAtEnd = (
    args: ComponentProps<typeof Button>,
) => (
    <Button
        size="lg"
        iconPosition="end"
        icon={placeholder[args?.size as keyof typeof placeholder]}
        {...args}
    />
);
export const ButtonDisabled = (args: ComponentProps<typeof Button>) => (
    <Button
        iconPosition="end"
        disabled
        icon={placeholder[args?.size as keyof typeof placeholder]}
        {...args}
    />
);
export const ButtonWithLoading = (args: ComponentProps<typeof Button>) => (
    <Button
        iconPosition="end"
        isLoading
        icon={placeholder[args?.size as keyof typeof placeholder]}
        {...args}
    />
);
export const ButtonWithFullWidthAndLoading = (
    args: ComponentProps<typeof Button>,
) => (
    <Button
        iconPosition="end"
        isLoading
        fullWidth
        icon={placeholder[args?.size as keyof typeof placeholder]}
        {...args}
    />
);

export const BlackWhite: Story = {
    args: {
        color: "black-white",
    },
};

const Example: React.FC<React.ComponentProps<typeof Button>> = (args) => (
    <div
        style={{
            backgroundColor:
                "var(--semantic-color-slate-solid-surface-inverse-lowest)",
            padding: "20px",
            borderRadius: "10px",
        }}
    >
        <Button {...args} />
    </div>
);

export const WhiteBlack = Example.bind(this) as Story;
WhiteBlack.args = {
    color: "white-black",
};
