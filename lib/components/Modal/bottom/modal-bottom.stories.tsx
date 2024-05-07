import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useEffect, useState } from "react";
import {
    StandaloneCircleSterlingRegularIcon,
    StandaloneTrashRegularIcon,
} from "@deriv/quill-icons";
import { ModalBottom } from "./index";
import { Button } from "@components/Button";
import Modal from "../base";

interface Template extends React.ComponentProps<typeof ModalBottom> {
    image?: React.ReactNode;
    src?: string;
    style?: React.CSSProperties;
    textContent?: React.ReactNode;
}

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
const ImageComponent = <img src={imageSRC} alt="Apples" />;

const preloadImage = (imageSRC: string) => {
    const img = new Image();
    img.src = imageSRC;
};

preloadImage(imageSRC);

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
        // showHandleBar: true,
        showSecondaryButton: true,
        toggleModal: fn(),
        primaryButtonLabel: primaryButtonLabel,
        primaryButtonCallback: fn(),
        secondaryButtonLabel: secondaryButtonLabel,
    },
    argTypes: {
        children: {
            table: { type: { summary: "ReactNode" } },
            description:
                "Modal's content. Can be wrapped with the `<ModalBottom.Header/>` and `<ModalBottom.Body/>` components in order to organize the content inside the modal. Each of them accepts className for customization and `<ModalBottom.Header/>` can also be passed scr and height properties.",
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

const Template: React.FC<Template> = ({
    image,
    src,
    style,
    textContent = shortTextContent,
    ...args
}: Template) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                size="lg"
                label={openModalButtonLabel}
                onClick={() => setIsOpen(true)}
            />
            <ModalBottom {...args} isOpened={isOpen} toggleModal={setIsOpen}>
                <Modal.Header
                    title={titlePlaceHolderText}
                    image={image}
                    src={src}
                    style={style}
                />
                <Modal.Body>{textContent}</Modal.Body>
            </ModalBottom>
        </>
    );
};

export const DefaultModalBottom = Template.bind(this) as Story;
DefaultModalBottom.args = { ...meta.args };

export const ModalBottomWithoutHandleBar = Template.bind(this) as Story;
ModalBottomWithoutHandleBar.args = {
    ...meta.args,
    showHandleBar: false,
};

export const ModalBottomWithoutSecondaryButton = Template.bind(this) as Story;
ModalBottomWithoutSecondaryButton.args = {
    ...meta.args,
    showSecondaryButton: false,
};

export const ClosingModalBottomOnPrimaryButtonClick = Template.bind(
    this,
) as Story;
ClosingModalBottomOnPrimaryButtonClick.args = {
    ...meta.args,
    shouldCloseOnPrimaryButtonClick: true,
    textContent: mediumTextContent,
} as Story["args"];

export const ModalBottomExpandedByDefault = Template.bind(this) as Story;
ModalBottomExpandedByDefault.args = {
    ...meta.args,
    textContent: longTextContent,
} as Story["args"];

export const ModalBottomWithImage = Template.bind(this) as Story;
ModalBottomWithImage.args = {
    ...meta.args,
    image: ImageComponent,
} as Story["args"];

export const ModalBottomWithImageAndLongContent = Template.bind(this) as Story;
ModalBottomWithImageAndLongContent.args = {
    ...meta.args,
    image: ImageComponent,
    textContent: longTextContent,
} as Story["args"];

export const ModalBottomWithImageSrc = Template.bind(this) as Story;
ModalBottomWithImageSrc.args = {
    ...meta.args,
    src: imageSRC,
    textContent: mediumTextContent,
} as Story["args"];

export const ModalBottomWithIcon = Template.bind(this) as Story;
ModalBottomWithIcon.args = {
    ...meta.args,
    image: (
        <StandaloneTrashRegularIcon
            fill="var(--core-color-solid-red-900)"
            iconSize="2xl"
        />
    ),
    style: {
        backgroundColor: "var(--core-color-solid-red-100)",
    },
} as Story["args"];

export const ModalBottomWithIconAndLongContent = Template.bind(this) as Story;
ModalBottomWithIconAndLongContent.args = {
    ...meta.args,
    image: (
        <StandaloneCircleSterlingRegularIcon
            fill="var(--core-color-solid-green-900)"
            iconSize="2xl"
        />
    ),
    style: {
        backgroundColor: "var(--core-color-solid-green-100)",
    },
    textContent: longTextContent,
} as Story["args"];
