import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useEffect, useState } from "react";
import {
    StandaloneCircleSterlingRegularIcon,
    StandaloneTrashRegularIcon,
} from "@deriv/quill-icons";
import { ModalBottom } from "./index";

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
        children: <div>This is some amazing placeholder text.</div>,
        isOpened: false,
        showHandleBar: true,
        showSecondaryButton: true,
        shouldCloseOnPrimaryButtonClick: false,
        toggleModal: fn(),
        primaryButtonLabel: "Primary Button Label",
        primaryButtonFunction: fn(),
        secondaryButtonLabel: "Secondary Button Label",
    },
    argTypes: {
        children: {
            table: { type: { summary: "ReactNode" } },
            description:
                "Modal's content. Can be wrapped with the `<ModalBottom.Title/>` and `<ModalBottom.Body/>` components in order to organize the content inside the modal.",
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
                "Controls the visibility of the handlebar. If handlebar is visible, the modal can be expanded/collapsed by swiping up/down handlebar.",
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
                "ID of the modal container. If it wasn't passed, the modal will try to find any container with 'modal-root' className. If there is no container with 'modal-root' className the modal will be insert inside document.body.",
            control: { type: "string" },
        },
        primaryButtonLabel: {
            table: { type: { summary: "ReactNode | undefined" } },
            description: "Label for the primary button.",
            control: { type: "string" },
        },
        primaryButtonFunction: {
            table: { type: { summary: "() => void | undefined" } },
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

type TStoryButton = {
    onClick: () => void;
};
const StoryButton = ({ onClick }: TStoryButton) => {
    return (
        <button
            onClick={onClick}
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
    );
};

const shortTextContent = "This is some amazing placeholder.";
const placeHolderText =
    "Lorem ipsum dolor sit amet consectetur. Venenatis malesuada nibh sed ornare rnare id suspendisse sed.";
const mediumTextContent = placeHolderText.padStart(200, placeHolderText);
const longTextContent = placeHolderText.padStart(600, placeHolderText);
const titlePlaceHolderText = "Title";
const imageSRC =
    "https://s3-alpha-sig.figma.com/img/0142/120e/ea5dfd0e3c7e47afe2065bc8ede54619?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bOD8Qd164Vg-bVj6aDGYW~z5O~b-l7rZjiGDOv8f4wV3r6m2Uyd8hQE7YJ6GaWdpk3SdepU7K-G1pnDaY98Ad3f7JNxXCcINWLow1taHSPRLY7geAUvrrTzWifBTsAdVzPN0bdxWyRZzf5hwpDI1nUhEeOFi2~AZfjc108ZxsInrnheatnC7hQoEQRtYv4biN8gMC1PANCI1l1kVk1vySLvl8CR0Yf6xOmlIl-wXo4k8lR7RWZ-SpEDQjWRIKQFwl9KlTdJuW0YU4XyBi0TeIiBsNefXlc~pQNSdXrBQQDqLhAS1eYFZY~71GDujq1vLbkoYmBn5K0f9DLWqjmghwQ__";

export const DefaultModalBottom: Story = {
    name: "Default Modal Bottom",
    args: {
        isOpened: false,
        toggleModal: fn(),
        primaryButtonLabel: "Primary Button Label",
        secondaryButtonLabel: "Secondary Button Label",
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(args.isOpened);

        useEffect(() => {
            setIsOpen(args.isOpened);
        }, [args.isOpened]);

        return (
            <>
                <StoryButton onClick={() => setIsOpen(true)} />
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
        toggleModal: fn(),
        primaryButtonLabel: "Primary Button Label",
        secondaryButtonLabel: "Secondary Button Label",
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(args.isOpened);

        useEffect(() => {
            setIsOpen(args.isOpened);
        }, [args.isOpened]);

        return (
            <>
                <StoryButton onClick={() => setIsOpen(true)} />
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
        toggleModal: fn(),
        primaryButtonLabel: "Primary Button Label",
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(args.isOpened);

        useEffect(() => {
            setIsOpen(args.isOpened);
        }, [args.isOpened]);

        return (
            <>
                <StoryButton onClick={() => setIsOpen(true)} />
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
        toggleModal: fn(),
        primaryButtonLabel: "Primary Button Label",
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(args.isOpened);

        useEffect(() => {
            setIsOpen(args.isOpened);
        }, [args.isOpened]);

        return (
            <>
                <StoryButton onClick={() => setIsOpen(true)} />
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
        toggleModal: fn(),
        primaryButtonLabel: "Primary Button Label",
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(args.isOpened);

        useEffect(() => {
            setIsOpen(args.isOpened);
        }, [args.isOpened]);

        return (
            <>
                <StoryButton onClick={() => setIsOpen(true)} />
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
        toggleModal: fn(),
        primaryButtonLabel: "Primary Button Label",
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(args.isOpened);

        useEffect(() => {
            setIsOpen(args.isOpened);
        }, [args.isOpened]);

        return (
            <>
                <StoryButton onClick={() => setIsOpen(true)} />
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
        toggleModal: fn(),
        primaryButtonLabel: "Primary Button Label",
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(args.isOpened);

        useEffect(() => {
            setIsOpen(args.isOpened);
        }, [args.isOpened]);

        return (
            <>
                <StoryButton onClick={() => setIsOpen(true)} />
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
        toggleModal: fn(),
        primaryButtonLabel: "Primary Button Label",
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(args.isOpened);

        useEffect(() => {
            setIsOpen(args.isOpened);
        }, [args.isOpened]);

        return (
            <>
                <StoryButton onClick={() => setIsOpen(true)} />
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
        toggleModal: fn(),
        primaryButtonLabel: "Primary Button Label",
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(args.isOpened);

        useEffect(() => {
            setIsOpen(args.isOpened);
        }, [args.isOpened]);

        return (
            <>
                <StoryButton onClick={() => setIsOpen(true)} />
                <ModalBottom
                    {...args}
                    isOpened={isOpen}
                    toggleModal={setIsOpen}
                >
                    <ModalBottom.Image className="indicator--danger">
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
        toggleModal: fn(),
        primaryButtonLabel: "Primary Button Label",
    },
    render: (args) => {
        const [isOpen, setIsOpen] = useState(args.isOpened);

        useEffect(() => {
            setIsOpen(args.isOpened);
        }, [args.isOpened]);

        return (
            <>
                <StoryButton onClick={() => setIsOpen(true)} />
                <ModalBottom
                    {...args}
                    isOpened={isOpen}
                    toggleModal={setIsOpen}
                >
                    <ModalBottom.Image className="indicator--success">
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
