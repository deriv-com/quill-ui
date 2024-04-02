import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useEffect, useState } from "react";
import { ModalBottom } from "./index";

const meta = {
    title: "Components/ModalBottom",
    component: ModalBottom,
    parameters: {
        layout: "centered",
        viewport: {
            defaultViewport: "mobile2",
        },
    },
    tags: ["autodocs"],
    args: {
        children: (
            <div>
                <p>Hi</p>
                <button>Close Modal</button>
            </div>
        ),
        hasImage: false,
        isOpened: false,
        showHandleBar: true,
        showSecondaryButton: true,
        isContentLong: false,
        toggleModal: fn(),
    },
    argTypes: {
        children: {
            table: { type: { summary: "ReactNode" } },
            description:
                "Modal's content. Can be wrapped with the `<Modal.Title/>` and `<Modal.Body/>` components in order to organize the content inside the modal.",
            control: { type: null },
        },
        isOpened: {
            table: { type: { summary: "boolean | undefined" } },
            options: ["true", "false"],
            description: "Controls the visibility of the modal",
            control: { type: "boolean" },
        },
        hasImage: {
            table: { type: { summary: "boolean | undefined" } },
            options: ["true", "false"],
            description: "Flag for the component spacing adjustment",
            control: { type: "boolean" },
        },
        // TODO: expand the description of this prop
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
        showHandleBar: {
            table: { type: { summary: "boolean | undefined" } },
            options: ["true", "false"],
            description: "Controls the visibility of the handlebar",
            control: { type: "boolean" },
        },
        showSecondaryButton: {
            table: { type: { summary: "boolean | undefined" } },
            options: ["true", "false"],
            description: "Controls the visibility of the secondary button",
            control: { type: "boolean" },
        },
        toggleModal: {
            table: { type: { summary: "(isOpened: boolean) => void" } },
            description:
                "Function for changing state of the visibility of the modal",
            control: { type: null },
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
        showHandleBar: true,
        showSecondaryButton: true,
        toggleModal: fn(),
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
                    // style={{
                    //     width: "360px",
                    //     height: "740px",
                    //     boxShadow: "10px 5px 5px black",
                    //     borderRadius: "30px",
                    //     backgroundColor: "white",
                    //     position: "relative",
                    //     display: "flex",
                    //     justifyContent: "center",
                    //     alignItems: "center",
                    //     overflow: "hidden",
                    // }}
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
                    <ModalBottom.Title>Title</ModalBottom.Title>
                    <ModalBottom.Body>
                        This is some amazing placeholder text.
                    </ModalBottom.Body>
                </ModalBottom>
            </>
        );
    },
};
