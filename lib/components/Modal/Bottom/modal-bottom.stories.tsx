import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { ModalBottom } from "./index";

const meta = {
    title: "Components/ModalBottom",
    component: ModalBottom,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        children: (
            <div>
                <p>Hi</p>
                <button>Close Modal</button>
            </div>
        ),
        isOpened: false,
    },
    argTypes: {
        children: {
            description: "Modal content",
            control: { type: null },
        },
        isOpened: {
            table: { type: { summary: "boolean | undefined" } },
            options: ["true", "false"],
            description: "Controls the visibility of the modal",
            control: { type: "boolean" },
        },
        className: {
            table: { type: { summary: "string | undefined" } },
            description: "ClassName for external tag of the component",
            control: { type: "text" },
        },
    },
} satisfies Meta<typeof ModalBottom>;

export default meta;
type Story = StoryObj<typeof meta>;

// TODO: rename after
export const Default: Story = {
    name: "Default Modal",
    args: {
        isOpened: false,
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(args.isOpened);

        useEffect(() => {
            setIsOpen(args.isOpened);
        }, [args.isOpened]);
        return (
            <>
                <div
                    id="modal-root"
                    style={{
                        width: "360px",
                        height: "740px",
                        border: "1px solid black",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        position: "relative",
                    }}
                />
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        margin: "20px auto",
                        padding: "8px 10px",
                        backgroundColor: "red",
                        borderRadius: "8px",
                        cursor: "pointer",
                        color: "white",
                    }}
                >
                    Open Modal
                </button>
                <ModalBottom isOpened={isOpen}>
                    <div>
                        <p>Hi!</p>
                        <p>
                            This is some amazing placeholder text for Modal
                            Bottom
                        </p>
                    </div>
                </ModalBottom>
            </>
        );
    },
};
