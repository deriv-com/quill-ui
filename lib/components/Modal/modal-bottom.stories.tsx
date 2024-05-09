import type { Meta, StoryObj } from "@storybook/react";
import { ModalExample } from "./mocks/example";
import { StandaloneTrashRegularIcon } from "@deriv/quill-icons/Standalone";
const placeHolderText =
    "Lorem ipsum dolor sit amet consectetur. Venenatis malesuada nibh sed ornare rnare id suspendisse sed.";
const mediumTextContent = placeHolderText.padStart(200, placeHolderText);
const longTextContent = placeHolderText.padStart(600, placeHolderText);

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
    component: ModalExample,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        showHandleBar: true,
        showSecondaryButton: true,
        isMobile: true,
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
        isMobile: {
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
} satisfies Meta<typeof ModalExample>;

export default meta;

type Story = StoryObj<typeof ModalExample>;

export const Default: Story = {
    args: {
        isMobile: true,
    },
};
export const ModalBottomWithoutHandleBars: Story = {
    args: {
        showHandleBar: false,
    },
};
export const ModalBottomWithoutSecondaryButton: Story = {
    args: {
        showSecondaryButton: false,
    },
};
export const ClosingModalBottomOnPrimaryButtonClick: Story = {
    args: {
        shouldCloseOnPrimaryButtonClick: true,
        textContent: mediumTextContent,
    },
};
export const ModalBottomExpandedByDefault: Story = {
    args: {
        textContent: longTextContent,
    },
};

export const ModalBottomWithImage: Story = {
    args: {
        image: ImageComponent,
    },
};
export const ModalBottomWithImageAndLongContent: Story = {
    args: {
        image: ImageComponent,
        textContent: longTextContent,
    },
};
export const ModalBottomWithImageSrc: Story = {
    args: {
        src: imageSRC,
        textContent: mediumTextContent,
    },
};
export const ModalBottomWithIcon: Story = {
    args: {
        image: (
            <StandaloneTrashRegularIcon
                fill="var(--core-color-solid-red-900)"
                iconSize="2xl"
            />
        ),
        style: {
            backgroundColor: "var(--core-color-solid-red-100)",
        },
    },
};
export const ModalBottomWithIconAndLongContent: Story = {
    args: {
        image: (
            <StandaloneTrashRegularIcon
                fill="var(--core-color-solid-red-900)"
                iconSize="2xl"
            />
        ),
        style: {
            backgroundColor: "var(--core-color-solid-red-100)",
        },
        textContent: longTextContent,
    },
};