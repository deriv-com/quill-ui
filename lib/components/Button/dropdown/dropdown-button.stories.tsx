import type { Meta, StoryObj } from "@storybook/react";
import { DropdownButton } from ".";
import {
    LabelPairedBarsFilterMdRegularIcon,
    LabelPairedPlaceholderCaptionBoldIcon,
} from "@deriv/quill-icons";

const generateItems = (
    length: number,
    onClick?: boolean,
    leftIcon?: boolean,
    rightIcon?: boolean,
) =>
    Array.from({ length }, (_, index) => ({
        id: index + 1,
        value: (index + 1).toString(),
        label: `Sample Item ${index + 1}`,
        onClick: () => onClick && alert(`Item ${index + 1}`),
        leftIcon: leftIcon && <LabelPairedPlaceholderCaptionBoldIcon />,
        rightIcon: rightIcon && <LabelPairedPlaceholderCaptionBoldIcon />,
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
        actionSheetFooter: {
            primaryAction: {
                content: "Apply",
                onAction: () => null,
            },
        },
        isLoading: false,
        color: "coral",
        variant: "primary",
    },
    argTypes: {
        variant: {
            options: ["primary", "secondary", "tertiary"],
            control: { type: "radio" },
            description: "Props to switch variant of the button.",
            table: {
                type: { summary: "primary | secondary | tertiary" },
                defaultValue: { summary: "primary" },
            },
        },
        icon: {
            description:
                "This props allowed you to pass in icon into the button",
            options: Object.keys(icons),
            mapping: icons,
            control: {
                type: "radio",
            },
            table: {
                type: { summary: "ReactNode" },
            },
        },
        iconPosition: {
            options: ["start", "end"],
            control: { type: "radio" },
            description:
                "To control icon position at the start or at the end. Only available when you pass in icon. By default will be at the end.",
            table: { type: { summary: "start | end" } },
        },
        contentAlign: {
            options: ["left", "right"],
            control: { type: "radio" },
            description:
                "To control align of the dropdown content from the button.",
            table: {
                type: { summary: "left | right" },
                defaultValue: { summary: "left" },
            },
        },
        contentHeight: {
            options: ["sm", "md", "lg"],
            control: { type: "radio" },
            table: { type: { summary: "sm | md | lg" } },
            description: "To control the content height.",
        },
        contentTitle: {
            description: "Use this props when you need title in the content.",
        },
        contentCenter: {
            table: { type: { summary: "boolean" } },
            description: "Set to true when you need content to be center",
        },
        actionSheetFooter: {
            description:
                "For dropdown button on mobile screen size will be an actionsheet. If you need button in the actionsheet you can use this props to handle the button in the action sheet footer. The props allowed is same as action sheet footer props.",
            table: {
                type: { summary: "FooterProps" },
            },
        },
        isLoading: {
            options: ["true", "false"],
            control: { type: "boolean" },
            description: "To control the loading state of dropdown button.",
            table: { defaultValue: { summary: "false" } },
        },
        label: {
            description:
                "Label for the dropdown button. If label value is empty will be `IconButton` you'll need you pass in icon.",
        },
        size: {
            options: ["sm", "md", "lg", "xl"],
            control: { type: "radio" },
            description: "To control the size of the dropdown button.",
            table: { type: { summary: "sm | md | lg | xl" } },
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
            description: "To control the color of the dropdown button.",
            table: {
                type: {
                    summary:
                        "coral|black|white|purchase|sell|black-white|white-black",
                },
                defaultValue: { summary: "coral" },
            },
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
        disabled: {
            description: "To disable the dropdown button",
            table: { defaultValue: { summary: "false" } },
        },
        closeContentOnClick: {
            description:
                "To control should close content on click content button",
            table: { defaultValue: { summary: "false" } },
        },
        checkbox: {
            description: "Change content to checkbox",
            table: { defaultValue: { summary: "false" } },
        },
        onSelectionChange: {
            description:
                "A callback function only for checkbox. Will return array items with selected value true if selected.",
            table: {
                type: {
                    summary: "(item: TSingleSelectItem[]) => void",
                },
            },
        },
        options: {
            description: "Each button inside dropdown button.",
            table: {
                type: {
                    summary: "TSingleSelectItem[]",
                },
            },
        },
        onOpen: {
            description: "A callback function on dropdown content open",
            table: { type: { summary: "() => void" } },
        },
        onClose: {
            description: "A callback function on dropdown content close",
            table: { type: { summary: "() => void" } },
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof DropdownButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownMenu: Story = {
    args: {
        label: "Default Dropdown Button",
        size: "md",
        options: generateItems(15, true),
        onOpen: () => console.log("open"),
        onClose: () => console.log("close"),
    },
};

export const DropdownMenuContentCentered: Story = {
    args: {
        label: "Dropdown Button Content Center",
        size: "md",
        options: generateItems(15, true),
        onOpen: () => console.log("open"),
        onClose: () => console.log("close"),
        contentCenter: true,
    },
};

export const DropdownMenuCheckboxContent: Story = {
    args: {
        label: "Dropdown Menu Checkbox Content",
        size: "md",
        options: generateItems(15),
        onOpen: () => console.log("open"),
        onClose: () => console.log("close"),
        checkbox: true,
    },
};

export const WithContentTitle: Story = {
    args: {
        label: "Dropdown Menu With Content Title",
        size: "md",
        options: generateItems(15),
        onOpen: () => console.log("open"),
        onClose: () => console.log("close"),
        contentTitle: "Title",
    },
};

export const MenuIconButton: Story = {
    args: {
        size: "lg",
        options: generateItems(15),
        icon: <LabelPairedBarsFilterMdRegularIcon />,
        checkbox: true,
        contentTitle: "Title",
        variant: "secondary",
        color: "black",
        onOpen: () => console.log("open"),
        onClose: () => console.log("close"),
    },
};

export const ContentAlignRight: Story = {
    args: {
        size: "lg",
        options: generateItems(15),
        icon: <LabelPairedBarsFilterMdRegularIcon />,
        checkbox: true,
        contentTitle: "Title",
        variant: "secondary",
        color: "black",
        onOpen: () => console.log("open"),
        onClose: () => console.log("close"),
        contentAlign: "right",
    },
};

export const ContentWithLeftIcon: Story = {
    args: {
        size: "lg",
        options: generateItems(15, false, true),
        icon: <LabelPairedBarsFilterMdRegularIcon />,
        contentTitle: "Title",
        variant: "secondary",
        color: "black",
        label: "label",
    },
};

export const ContentWithRightIcon: Story = {
    args: {
        size: "lg",
        options: generateItems(15, false, false, true),
        icon: <LabelPairedBarsFilterMdRegularIcon />,
        contentTitle: "Title",
        variant: "secondary",
        color: "black",
        label: "label",
    },
};

export const ContentWithLeftAndRightIcon: Story = {
    args: {
        size: "lg",
        options: generateItems(15, false, true, true),
        icon: <LabelPairedBarsFilterMdRegularIcon />,
        contentTitle: "Title",
        variant: "secondary",
        color: "black",
        label: "label",
    },
};

export const ContentWithCheckboxAndIcon: Story = {
    args: {
        size: "lg",
        options: generateItems(15, false, false, true),
        icon: <LabelPairedBarsFilterMdRegularIcon />,
        contentTitle: "Title",
        variant: "secondary",
        checkbox: true,
        color: "black",
        label: "label",
    },
};
