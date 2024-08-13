import type { Meta, StoryObj } from "@storybook/react";
import { DropdownButton } from ".";
import {
    LabelPairedBarsFilterMdRegularIcon,
    LabelPairedPlaceholderCaptionBoldIcon,
} from "@deriv/quill-icons";

const generateItems = (length: number, onClick?: boolean) =>
    Array.from({ length }, (_, index) => ({
        id: index + 1,
        value: (index + 1).toString(),
        label: `Sample Item ${index + 1}`,
        onClick: () => onClick && alert(`Item ${index + 1}`),
    }));

const icons: Record<string, object | null> = {
    with_icon: <LabelPairedPlaceholderCaptionBoldIcon />,
    none: null,
};

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
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
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
        iconPosition: "start",
        contentHeight: "sm",
        contentTitle: "",
        contentCenter: false,
    },
    argTypes: {
        variant: {
            options: ["primary", "secondary", "tertiary"],
            control: { type: "radio" },
        },
        icon: {
            description:
                "This props allowed you to pass in icon into the button",
            options: Object.keys(icons),
            mapping: icons,
            control: {
                type: "radio",
            },
        },
        iconPosition: {
            options: ["start", "end"],
            control: { type: "radio" },
        },
        contentAlign: {
            options: ["left", "right"],
            control: { type: "radio" },
        },
        contentHeight: {
            options: ["lg", "md", "sm"],
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
