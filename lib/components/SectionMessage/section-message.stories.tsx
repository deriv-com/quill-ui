import type { Meta, StoryObj } from "@storybook/react";
import { SectionMessage } from "./index";
import Link from "@components/Link";

const meta = {
    title: "Components/SectionMessage",
    component: SectionMessage,
    decorators: [
        (Story) => (
            <div style={{ width: "800px" }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        layout: "centered",
    },
    argTypes: {
        size: {
            options: ["sm", "md"],
            control: { type: "radio" },
            description: "To select the size of the section-message",
        },
        status: {
            options: ["info", "success", "warning", "danger", null],
            control: { type: "radio" },
            description: "To select the status",
        },
    },
    tags: ["autodocs"],
} satisfies Meta<typeof SectionMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: "Default",
        message: "This is a message",
        size: "md",
    },
};

export const Info: Story = {
    args: {
        title: "Information",
        message: "This is an information message",
        size: "md",
        status: "info",
        links: [<Link>Click here</Link>],
    },
};

export const Success: Story = {
    args: {
        title: "Success",
        message: "This is a success message",
        size: "md",
        status: "success",
        links: [<Link>Click here</Link>, <Link>Click here</Link>],
    },
};

export const Danger: Story = {
    args: {
        title: "Danger",
        message: "This is a danger message",
        size: "md",
        status: "danger",
        links: [<Link>Click here</Link>],
    },
};

export const Warning: Story = {
    args: {
        title: "Warning",
        message: "This is a warning message",
        size: "md",
        status: "warning",
        links: [<Link>Click here</Link>],
    },
};
