import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./index";
import { Text } from "@components/Typography";

const meta = {
    title: "Components/Tooltip/Base",
    component: Tooltip,
    args: {
        tooltipPosition: "top",
        variant: "base",
        tooltipContent: "Description",
        children: (
            <Text
                style={{ padding: "10px", height: "32px", cursor: "pointer" }}
            >
                Hover to see tooltip
            </Text>
        ),
        as: "div",
        title: "Title",
        linkText: "label",
    },
    argTypes: {
        tooltipPosition: {
            table: { type: { summary: "string" } },
            description: "Position of the tooltip",
            control: {
                type: "select",
                options: ["top", "bottom", "left", "right"],
            },
        },
        variant: {
            table: { type: { summary: "string" } },
            description: "Variant of the tooltip",
            control: { type: "select", options: ["base", "rich"] },
        },
        tooltipContent: {
            table: { type: { summary: "string" } },
            description: "Content of the tooltip",
            control: { type: "text" },
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
            control: { type: null },
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
        linkText: {
            table: { type: { summary: "ReactNode" } },
            description: "Link text of the tooltip",
            control: { type: "text" },
        },
    },
    parameters: { layout: "centered" },
    tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TooltipTopCenter: Story = {
    args: {},
};
export const TooltipTopLeft: Story = {
    args: {
        popoverAlign: "end",
    },
};
export const TooltipTopRight: Story = {
    args: {
        popoverAlign: "start",
    },
};
export const TooltipBottomCenter: Story = {
    args: {
        tooltipPosition: "bottom",
    },
};
export const TooltipBottomLeft: Story = {
    args: {
        tooltipPosition: "bottom",
        popoverAlign: "end",
    },
};
export const TooltipBottomRight: Story = {
    args: {
        tooltipPosition: "bottom",
        popoverAlign: "start",
    },
};
export const TooltipLeftCenter: Story = {
    args: {
        tooltipPosition: "left",
    },
};
export const TooltipLeftTop: Story = {
    args: {
        tooltipPosition: "left",
        popoverAlign: "start",
    },
};
export const TooltipLeftBottom: Story = {
    args: {
        tooltipPosition: "left",
        popoverAlign: "end",
    },
};
export const TooltipRightCenter: Story = {
    args: {
        tooltipPosition: "right",
    },
};
export const TooltipRightTop: Story = {
    args: {
        tooltipPosition: "right",
        popoverAlign: "start",
    },
};
export const TooltipRightBottom: Story = {
    args: {
        tooltipPosition: "right",
        popoverAlign: "end",
    },
};
