import type { Meta, StoryObj } from "@storybook/react";
import { DropdownButton } from ".";
import { LabelPairedBarsFilterMdRegularIcon } from "@deriv/quill-icons";

const generateItems = (length: number, onClick?: boolean) =>
    Array.from({ length }, (_, index) => ({
        id: index + 1,
        value: (index + 1).toString(),
        label: `Sample Item ${index + 1}`,
        onClick: () => onClick && alert(`Item ${index + 1}`),
    }));

const meta = {
    title: "Components/Button/Dropdown",
    component: DropdownButton,
    parameters: {
        docs: {
            story: {
                height: "300px",
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ display: "flex" }}>
                <Story />
            </div>
        ),
    ],
    args: {
        disabled: false,
        closeContentOnClick: false,
        checkbox: false,
        onSelectionChange: (e) => {
            console.log(e);
        },
    },
    argTypes: {
        variant: {
            options: ["primary", "secondary", "tertiary"],
            control: { type: "radio" },
        },
        "aria-label": {
            table: {
                disable: true,
            },
        },
        isLoading: {
            options: ["true", "false"],
            control: { type: "boolean" },
        },

        size: {
            options: ["sm", "md", "lg", "xl"],
            control: { type: "radio" },
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
            control: { type: "radio" },
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
    },
    tags: ["autodocs"],
} satisfies Meta<typeof DropdownButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownMenu: Story = {
    args: {
        label: "Label",
        size: "md",
        options: generateItems(15, true),
        onOpen: () => console.log("open"),
        onClose: () => console.log("close"),
    },
};

export const MenuIconButton: Story = {
    args: {
        size: "lg",
        options: generateItems(15),
        icon: <LabelPairedBarsFilterMdRegularIcon />,
        checkbox: true,
        contentTitle: "Title",
        onOpen: () => console.log("open"),
        onClose: () => console.log("close"),
    },
};
