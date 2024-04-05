import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useEffect, useState } from "react";
import {
    StandaloneCircleSterlingRegularIcon,
    StandaloneTrashRegularIcon,
} from "@deriv/quill-icons";
import { ModalBottom } from "./index";
import { Button } from "../../Button";

const openModalButtonLabel = "Open Modal";
const primaryButtonLabel = "Primary Button Label";
const secondaryButtonLabel = "Secondary Button Label";
const shortTextContent = "This is some amazing placeholder.";
const placeHolderText =
    "Lorem ipsum dolor sit amet consectetur. Venenatis malesuada nibh sed ornare rnare id suspendisse sed.";
const mediumTextContent = placeHolderText.padStart(200, placeHolderText);
const longTextContent = placeHolderText.padStart(600, placeHolderText);
const titlePlaceHolderText = "Title";
const imageSRC =
    "https://live.staticflickr.com/603/21947667154_e63cc9252b_b.jpg";

const meta = {
    title: "Components/Modal/Bottom",
    component: ModalBottom,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        viewport: {
            defaultViewport: "mobile1",
        },
    },
    args: {
        children: <div>{shortTextContent}</div>,
        isOpened: false,
        showHandleBar: true,
        showSecondaryButton: true,
        shouldCloseOnPrimaryButtonClick: false,
        toggleModal: fn(),
        primaryButtonLabel: primaryButtonLabel,
        primaryButtonCallback: fn(),
        secondaryButtonLabel: secondaryButtonLabel,
    },
    argTypes: {
        children: {
            table: { type: { summary: "ReactNode" } },
            description:
                "Modal's content. Can be wrapped with the `<ModalBottom.Image/>`,`<ModalBottom.Title/>` and `<ModalBottom.Body/>` components in order to organize the content inside the modal. Each of them accepts className for customization and `<ModalBottom.Image/>` can also be passed scr and height properties.",
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
            description: "ClassName for external tag of the component.",
            control: { type: "text" },
        },
        showHandleBar: {
            table: { type: { summary: "boolean | undefined" } },
            options: ["true", "false"],
            description:
                "Controls the visibility of the handlebar. If handlebar is visible, the modal can be expanded/collapsed by swiping up/down handlebar. Default value is true.",
            control: { type: "boolean" },
        },
        showSecondaryButton: {
            table: { type: { summary: "boolean | undefined" } },
            options: ["true", "false"],
            description: "Controls the visibility of the secondary button.",
            control: { type: "boolean" },
        },
        shouldCloseOnPrimaryButtonClick: {
            table: { type: { summary: "boolean | undefined" } },
            options: ["true", "false"],
            description:
                "Flag for controlling modal behavior. If it's true, then the modal will be closed after user clicks on the primary button.",
            control: { type: "boolean" },
        },
        toggleModal: {
            table: { type: { summary: "(isOpened: boolean) => void" } },
            description:
                "Function for changing state of the visibility of the modal.",
            control: { type: null },
        },
        portalId: {
            table: { type: { summary: "string | undefined" } },
            description:
                "ID of the modal container. If it wasn't passed, the modal will try to find any container with 'modal-root' ID. If there is no container with 'modal-root' ID the modal will be insert inside document.body.",
            control: { type: "string" },
        },
        primaryButtonLabel: {
            table: { type: { summary: "ReactNode" } },
            description: "Label for the primary button.",
            control: { type: "string" },
        },
        primaryButtonCallback: {
            table: { type: { summary: "(() => void) | undefined" } },
            description:
                "Function which will be called on clicking on primary button.",
            control: { type: null },
        },
        secondaryButtonLabel: {
            table: { type: { summary: "ReactNode | undefined" } },
            description: "Label for the secondary button.",
            control: { type: "string" },
        },
    },
} satisfies Meta<typeof ModalBottom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultModalBottom: Story = {
    name: "Default Modal Bottom",
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
                <Button
                    size="lg"
                    label={openModalButtonLabel}
                    onClick={() => setIsOpen(true)}
                />
                <ModalBottom
                    {...args}
                    isOpened={isOpen}
                    toggleModal={setIsOpen}
                >
                    <ModalBottom.Title>
                        {titlePlaceHolderText}
                    </ModalBottom.Title>
                    <ModalBottom.Body>{shortTextContent}</ModalBottom.Body>
                </ModalBottom>
            </>
        );
    },
};

export const ModalBottomWithoutHandleBar: Story = {
    name: "Modal Bottom without handle-bar (no swiping)",
    args: {
        isOpened: false,
        showHandleBar: false,
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(args.isOpened);

        useEffect(() => {
            setIsOpen(args.isOpened);
        }, [args.isOpened]);

        return (
            <>
                <Button
                    size="lg"
                    label={openModalButtonLabel}
                    onClick={() => setIsOpen(true)}
                />
                <ModalBottom
                    {...args}
                    isOpened={isOpen}
                    toggleModal={setIsOpen}
                >
                    <ModalBottom.Title>
                        {titlePlaceHolderText}
                    </ModalBottom.Title>
                    <ModalBottom.Body>{shortTextContent}</ModalBottom.Body>
                </ModalBottom>
            </>
        );
    },
};

export const ModalBottomWithoutSecondaryButton: Story = {
    name: "Modal Bottom without Secondary Button",
    args: {
        isOpened: false,
        showSecondaryButton: false,
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(args.isOpened);

        useEffect(() => {
            setIsOpen(args.isOpened);
        }, [args.isOpened]);

        return (
            <>
                <Button
                    size="lg"
                    label={openModalButtonLabel}
                    onClick={() => setIsOpen(true)}
                />
                <ModalBottom
                    {...args}
                    isOpened={isOpen}
                    toggleModal={setIsOpen}
                >
                    <ModalBottom.Title>
                        {titlePlaceHolderText}
                    </ModalBottom.Title>
                    <ModalBottom.Body>{shortTextContent}</ModalBottom.Body>
                </ModalBottom>
            </>
        );
    },
};

export const ClosingModalBottomOnPrimaryButtonClick: Story = {
    name: "Modal Bottom with closing option on Primary Button click",
    args: {
        isOpened: false,
        shouldCloseOnPrimaryButtonClick: true,
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(args.isOpened);

        useEffect(() => {
            setIsOpen(args.isOpened);
        }, [args.isOpened]);

        return (
            <>
                <Button
                    size="lg"
                    label={openModalButtonLabel}
                    onClick={() => setIsOpen(true)}
                />
                <ModalBottom
                    {...args}
                    isOpened={isOpen}
                    toggleModal={setIsOpen}
                >
                    <ModalBottom.Title>
                        {titlePlaceHolderText}
                    </ModalBottom.Title>
                    <ModalBottom.Body>{mediumTextContent}</ModalBottom.Body>
                </ModalBottom>
            </>
        );
    },
};

export const ModalBottomExpanded: Story = {
    name: "Modal Bottom with long content (expanded by default)",
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
                <Button
                    size="lg"
                    label={openModalButtonLabel}
                    onClick={() => setIsOpen(true)}
                />
                <ModalBottom
                    {...args}
                    isOpened={isOpen}
                    toggleModal={setIsOpen}
                >
                    <ModalBottom.Title>
                        {titlePlaceHolderText}
                    </ModalBottom.Title>
                    <ModalBottom.Body>{longTextContent}</ModalBottom.Body>
                </ModalBottom>
            </>
        );
    },
};

export const ModalBottomWithImage: Story = {
    name: "Modal Bottom with Image passed as ReactNode (height is not fixed)",
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
                <Button
                    size="lg"
                    label={openModalButtonLabel}
                    onClick={() => setIsOpen(true)}
                />
                <ModalBottom
                    {...args}
                    isOpened={isOpen}
                    toggleModal={setIsOpen}
                >
                    <ModalBottom.Image>
                        <img src={imageSRC} alt="Apples" />
                    </ModalBottom.Image>
                    <ModalBottom.Title>
                        {titlePlaceHolderText}
                    </ModalBottom.Title>
                    <ModalBottom.Body>{shortTextContent}</ModalBottom.Body>
                </ModalBottom>
            </>
        );
    },
};

export const ModalBottomWithImageAndLongContent: Story = {
    name: "Modal Bottom with Image as ReactNode (height is not fixed) and long content",
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
                <Button
                    size="lg"
                    label={openModalButtonLabel}
                    onClick={() => setIsOpen(true)}
                />
                <ModalBottom
                    {...args}
                    isOpened={isOpen}
                    toggleModal={setIsOpen}
                >
                    <ModalBottom.Image>
                        <img src={imageSRC} alt="Oranges" />
                    </ModalBottom.Image>
                    <ModalBottom.Title>
                        {titlePlaceHolderText}
                    </ModalBottom.Title>
                    <ModalBottom.Body>{longTextContent}</ModalBottom.Body>
                </ModalBottom>
            </>
        );
    },
};

export const ModalBottomWithImageSRC: Story = {
    name: "Modal Bottom with Image src and fixed height",
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
                <Button
                    size="lg"
                    label={openModalButtonLabel}
                    onClick={() => setIsOpen(true)}
                />
                <ModalBottom
                    {...args}
                    isOpened={isOpen}
                    toggleModal={setIsOpen}
                >
                    <ModalBottom.Image src={imageSRC} />
                    <ModalBottom.Title>
                        {titlePlaceHolderText}
                    </ModalBottom.Title>
                    <ModalBottom.Body>{mediumTextContent}</ModalBottom.Body>
                </ModalBottom>
            </>
        );
    },
};

export const ModalBottomWithIcon: Story = {
    name: "Modal Bottom with Icon",
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
                <Button
                    size="lg"
                    label={openModalButtonLabel}
                    onClick={() => setIsOpen(true)}
                />
                <ModalBottom
                    {...args}
                    isOpened={isOpen}
                    toggleModal={setIsOpen}
                >
                    <ModalBottom.Image
                        style={{
                            backgroundColor: "var(--core-color-solid-red-100)",
                        }}
                    >
                        <StandaloneTrashRegularIcon
                            fill="var(--core-color-solid-red-900)"
                            iconSize="2xl"
                        />
                    </ModalBottom.Image>
                    <ModalBottom.Title>
                        {titlePlaceHolderText}
                    </ModalBottom.Title>
                    <ModalBottom.Body>{shortTextContent}</ModalBottom.Body>
                </ModalBottom>
            </>
        );
    },
};

export const ModalBottomWithIconAndLongContent: Story = {
    name: "Modal Bottom with Icon and Long Content",
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
                <Button
                    size="lg"
                    label={openModalButtonLabel}
                    onClick={() => setIsOpen(true)}
                />
                <ModalBottom
                    {...args}
                    isOpened={isOpen}
                    toggleModal={setIsOpen}
                >
                    <ModalBottom.Image
                        style={{
                            backgroundColor:
                                "var(--core-color-solid-green-100)",
                        }}
                    >
                        <StandaloneCircleSterlingRegularIcon
                            fill="var(--core-color-solid-green-900)"
                            iconSize="2xl"
                        />
                    </ModalBottom.Image>
                    <ModalBottom.Title>
                        {titlePlaceHolderText}
                    </ModalBottom.Title>
                    <ModalBottom.Body>{longTextContent}</ModalBottom.Body>
                </ModalBottom>
            </>
        );
    },
};
