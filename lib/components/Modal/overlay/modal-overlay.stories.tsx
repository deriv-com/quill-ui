import type { Meta } from "@storybook/react";
import { ModalOverlay } from "./index";
import { useEffect, useState } from "react";
import { Button } from "@components/Button";
import { fn } from "@storybook/test";
import {
    StandaloneCircleSterlingRegularIcon,
    StandaloneTrashRegularIcon,
} from "@deriv/quill-icons/Standalone";

interface Template extends React.ComponentProps<typeof ModalOverlay> {
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
    title: "Components/Modal/Overlay",
    component: ModalOverlay,
    tags: ["autodocs"],

    args: {
        children: <div>{shortTextContent}</div>,
        isOpened: false,
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
                "Modal's content. Can be wrapped with the `<ModalOverlay.Header/>` and `<ModalOverlay.Body/>` components in order to organize the content inside the modal. Each of them accepts className for customization and `<ModalOverlay.Header/>` can also be passed scr and height properties.",
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
} satisfies Meta<typeof ModalOverlay>;

export default meta;

const Template: React.FC<Template> = ({
    image,
    src,
    style,
    textContent = shortTextContent,
    ...args
}: Template) => {
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

            <ModalOverlay {...args} isOpened={isOpen} toggleModal={setIsOpen}>
                <ModalOverlay.Header
                    title={titlePlaceHolderText}
                    image={image}
                    src={src}
                    style={style}
                />
                <ModalOverlay.Body>{textContent}</ModalOverlay.Body>
            </ModalOverlay>
        </>
    );
};
export const DefaultModalOverlay = Template.bind(this, meta.args);

export const ModalOverlayWithImage = Template.bind(this, {
    ...meta.args,
    image: ImageComponent,
});
export const ModalOverlayWithoutSecondaryButton = Template.bind(this, {
    ...meta.args,
    showSecondaryButton: false,
});

export const ClosingModalOverlayOnPrimaryButtonClick = Template.bind(this, {
    ...meta.args,
    shouldCloseOnPrimaryButtonClick: true,
    textContent: mediumTextContent,
});

export const ModalOverlayExpandedByDefault = Template.bind(this, {
    ...meta.args,
    textContent: longTextContent,
});

export const ModalOverlayWithImageAndLongContent = Template.bind(this, {
    ...meta.args,
    image: ImageComponent,
    textContent: longTextContent,
});

export const ModalOverlayWithImageSrc = Template.bind(this, {
    ...meta.args,
    src: imageSRC,
    textContent: mediumTextContent,
});

export const ModalOverlayWithIcon = Template.bind(this, {
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
});

export const ModalOverlayWithIconAndLongContent = Template.bind(this, {
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
});
