import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
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
        isContentLong: false,
        toggleModal: fn(),
        title: "Title",
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
        isContentLong: {
            table: { type: { summary: "boolean | undefined" } },
            options: ["true", "false"],
            description: "Flag for expanding modal",
            control: { type: "boolean" },
        },
        className: {
            table: { type: { summary: "string | undefined" } },
            description: "ClassName for external tag of the component",
            control: { type: "text" },
        },
        toggleModal: {
            table: { type: { summary: "(isOpened: boolean) => void" } },
            description:
                "Function for changing state of the visibility of the modal",
            control: { type: null },
        },
        title: {
            table: { type: { summary: "ReactNode" } },
            description: "Title of the Modal",
            control: { type: "ReactNode" },
        },
        portalId: {
            table: { type: { summary: "string | undefined" } },
            description: "ID of the modal container",
            control: { type: "string" },
        },
    },
} satisfies Meta<typeof ModalBottom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModalCollapsed: Story = {
    name: "Collapsed Modal",
    args: {
        isOpened: false,
        toggleModal: fn(),
        title: "Title",
        portalId: "modal-root",
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
                        boxShadow: "10px 5px 5px black",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                    }}
                >
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
                </div>
                <ModalBottom
                    {...args}
                    isOpened={isOpen}
                    toggleModal={setIsOpen}
                >
                    {/* <ModalBottom.Header>
                        <div>Some Image</div>
                    </ModalBottom.Header> */}
                    <ModalBottom.Body>
                        <p>Hi!</p>
                        <p>
                            This is some amazing placeholder text for Modal Body
                        </p>
                    </ModalBottom.Body>
                </ModalBottom>
            </>
        );
    },
};
