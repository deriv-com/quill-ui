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
            <div
                style={{
                    height: "20px",
                    padding: "16px 10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Text>Hover to see tooltip</Text>
            </div>
        ),
        as: "div",
        title: "Title",
        actionText: "label",
        shouldCloseToolTipOnMouseLeave: false,
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
        actionText: {
            control: "text",
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
            control: false,
        },
        tooltipColor: {
            table: { disable: true },
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
        hasArrow: {
            table: { type: { summary: "boolean" } },
            description: "Show arrow in tooltip",
            control: { type: "boolean" },
        },
        tooltipActionProps: {
            description: "Props for tooltip action link or button",
            table: { type: { summary: "LinkProps | ButtonProps" } },
            control: false,
        },
    },
    parameters: { layout: "centered" },
    tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;
export const DefaultTooltipTop: Story = {
    args: {
        hasArrow: false,
    },
};
export const DefaultTooltipBottom: Story = {
    args: {
        hasArrow: false,
        tooltipPosition: "bottom",
    },
};

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
