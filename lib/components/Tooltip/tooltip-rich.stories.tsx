import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./index";
import { Text } from "@components/Typography";

const meta = {
    title: "Components/Tooltip/Rich",
    component: Tooltip,
    args: {
        tooltipPosition: "top",
        variant: "rich",
        tooltipContent: "Description",
        shouldCloseToolTipOnMouseLeave: false,
        children: (
            <Text style={{ padding: "10px 28px", cursor: "pointer" }}>
                Hover to see tooltip
            </Text>
        ),
        tooltipActionProps: {
            size: "sm",
        },
        as: "div",
        actionText: "label",
        title: "Title",
    },
    argTypes: {
        tooltipPosition: {
            options: ["left", "right", "bottom", "top"],
            control: "radio",
        },
        variant: {
            table: { type: { summary: "string" } },
            description: "Variant of the tooltip",
            control: { type: "radio", options: ["base", "rich"] },
        },
        tooltipContent: {
            table: { type: { summary: "string" } },
            description: "Content of the tooltip",
            control: { type: "text" },
        },
        tooltipActionProps: {
            table: { type: { summary: "LinkProps | ButtonProps" } },
            description: "Props for tooltip action link or button",
            control: false,
        },
        shouldCloseToolTipOnMouseLeave: {
            table: { type: { summary: "boolean" } },
            description:
                "Close tooltip on mouse leave. Can be used only with variant rich where the tooltip can be closed by clicking on the cross icon",
            control: { type: "boolean" },
        },
        children: {
            table: { type: { summary: "ReactNode" } },
            description: "Content that holds tooltip",
            control: false,
        },
        as: {
            table: { type: { summary: "string" } },
            description: "Element type",
            control: { type: "select", options: ["a", "div", "button"] },
        },
        title: {
            table: { type: { summary: "string" } },
            description: "Title of the tooltip",
            control: { type: "text" },
        },
        tooltipAction: {
            table: { type: { summary: "ReactNode" } },
            description: "Action of the tooltip",
            control: { type: "radio", options: ["link", "button"] },
        },
        actionText: {
            table: { type: { summary: "string" } },
            description: "Text for link or button",
            control: { type: "text" },
        },
        hasArrow: {
            table: { type: { summary: "boolean" } },
            description: "Show arrow in tooltip",
            control: { type: "boolean" },
        },
        tooltipColor: { table: { disable: true } },
    },
    parameters: { layout: "centered" },
    tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;
export const DefaultTooltipRichTop: Story = {
    args: {
        hasArrow: false,
    },
};
export const DefaultTooltipRichBottom: Story = {
    args: {
        hasArrow: false,
        tooltipPosition: "bottom",
    },
};
export const TooltipRichTopCenter: Story = {
    args: {
        tooltipActionProps: {
            target: "_blank",
            href: "/",
        },
    },
};
export const TooltipRichWithButton: Story = {
    args: {
        tooltipAction: "button",

        tooltipActionProps: {
            onClick: () => {
                alert("Button clicked");
            },
        },
    },
};
export const TooltipRichTopLeft: Story = {
    args: {
        popoverAlign: "end",
    },
};
export const TooltipRichTopRight: Story = {
    args: {
        popoverAlign: "start",
    },
};
export const TooltipRichBottomCenter: Story = {
    args: {
        tooltipPosition: "bottom",
    },
};
export const TooltipRichBottomLeft: Story = {
    args: {
        tooltipPosition: "bottom",
        popoverAlign: "end",
    },
};
export const TooltipRichBottomRight: Story = {
    args: {
        tooltipPosition: "bottom",
        popoverAlign: "start",
    },
};
export const TooltipRichLeftCenter: Story = {
    args: {
        tooltipPosition: "left",
    },
};
export const TooltipRichLeftTop: Story = {
    args: {
        tooltipPosition: "left",
        popoverAlign: "start",
    },
};
export const TooltipRichLeftBottom: Story = {
    args: {
        tooltipPosition: "left",
        popoverAlign: "end",
    },
};
export const TooltipRichRightCenter: Story = {
    args: {
        tooltipPosition: "right",
    },
};
export const TooltipRichRightTop: Story = {
    args: {
        tooltipPosition: "right",
        popoverAlign: "start",
    },
};
export const TooltipRichRightBottom: Story = {
    args: {
        tooltipPosition: "right",
        popoverAlign: "end",
    },
};
