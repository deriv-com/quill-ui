import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useEffect, useState } from "react";
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
        docs: {
            height: "200px",
            width: "200px",
        },
    },
    args: {
        children: <div>This is some amazing placeholder text.</div>,
        hasImage: false,
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
        // TODO: expand the description of this prop
        hasImage: {
            table: { type: { summary: "boolean | undefined" } },
            options: ["true", "false"],
            description: "Flag for the component spacing adjustment.",
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

const bodyPlaceHolderText = "This is some amazing placeholder.";
const titlePlaceHolderText = "Title";

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
                    <ModalBottom.Body>{bodyPlaceHolderText}</ModalBottom.Body>
                </ModalBottom>
            </>
        );
    },
};

export const ModalBottomWithoutHandleBar: Story = {
    name: "Modal Bottom without handle-bar",
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
                    <ModalBottom.Body>{bodyPlaceHolderText}</ModalBottom.Body>
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
                    <ModalBottom.Body>{bodyPlaceHolderText}</ModalBottom.Body>
                </ModalBottom>
            </>
        );
    },
};

export const ClosingModalBottomOnPrimaryButtonClick: Story = {
    name: "Closing Modal Bottom on Primary Button click",
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
                    <ModalBottom.Body>
                        Lorem ipsum dolor sit amet consectetur. Venenatis
                        malesuada nibh sed ornare id suspendisse sed. Accumsan
                        leo ultrices risus feugiat tempor consectetur
                        pellentesque quis nulla.
                    </ModalBottom.Body>
                </ModalBottom>
            </>
        );
    },
};

export const ModalBottomExpanded: Story = {
    name: "Modal Bottom expanded",
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
                    <ModalBottom.Body>
                        Lorem ipsum dolor sit amet consectetur. Venenatis
                        malesuada nibh sed ornare id suspendisse sed. Accumsan
                        leo ultrices risus feugiat tempor consectetur
                        pellentesque quis nulla. Laoreet libero donec vel
                        sagittis augue arcu. Consectetur neque orci neque urna
                        tortor accumsan feugiat. Nulla amet malesuada vitae
                        facilisis malesuada egestas tristique. Odio nam nulla
                        sollicitudin magna amet sed a tortor sapien. Porttitor
                        et sed gravida egestas vel. At at eget in lacus
                        vulputate elementum elit. Senectus elementum aliquet
                        massa auctor sollicitudin lacus lacus pellentesque est.
                        Et sed odio amet nisl. Nunc viverra gravida tristique in
                        in iaculis eget lacus pellentesque. Sit volutpat lectus
                        eget condimentum tempor pretium in. Ac tortor euismod
                        senectus tristique. Sagittis nullam mattis ante nisl
                        venenatis diam hac fames risus. Neque a dui dui pharetra
                        arcu tincidunt ornare in. Neque nibh enim nunc vitae non
                        ultricies. Suscipit cursus nullam donec sociis interdum
                        donec odio feugiat. Eu congue malesuada sed
                        pellentesque. Etiam condimentum adipiscing ut elit morbi
                        blandit at. At enim mauris diam eget facilisis mauris
                        etiam ac lectus. Massa nulla morbi eleifend a. Donec
                        mauris ornare varius nullam morbi ornare in iaculis. Sed
                        et massa auctor non velit leo sed elementum curabitur.
                        Diam cursus montes imperdiet diam posuere nunc cras.
                        Lobortis dolor malesuada laoreet et. Feugiat nunc cras
                        urna feugiat elit adipiscing sodales eros. Ornare
                        feugiat nibh elementum pulvinar euismod risus aliquam
                        feugiat. Nulla varius velit enim curabitur orci. Gravida
                        quis gravida ut donec arcu tincidunt dictumst. Metus
                        augue duis odio ante libero mi interdum. Commodo tortor
                        eget etiam id vulputate lorem. Faucibus velit arcu nibh
                        elementum eget risus auctor quis donec. Adipiscing
                        pellentesque massa elit tellus massa pellentesque porta
                        ultrices. Ultricies ac dictumst sed et amet fringilla
                        bibendum. Cursus quam sed in cursus diam a nulla elit.
                        Et convallis a tortor sagittis ac sagittis sed id. Erat
                        neque viverra consectetur maecenas quisque arcu sagittis
                        diam. Quis ut nam molestie eu amet orci pellentesque.
                    </ModalBottom.Body>
                </ModalBottom>
            </>
        );
    },
};
