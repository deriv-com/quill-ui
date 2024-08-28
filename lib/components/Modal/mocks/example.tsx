import { useState } from "react";
import { Modal } from "@components/Modal";
import { ModalProps } from "../base";
import { Button } from "@components/Button";
import "@deriv-com/quill-tokens/dist/breakpoints.scss";
import useBreakpoints from "@hooks/useBreakpoints";

interface ModalExampleProps extends ModalProps {
    image?: React.ReactNode;
    src?: string;
    style?: React.CSSProperties;
    textContent?: React.ReactNode;
}
export const ModalExample = ({
    image,
    src,
    style,
    textContent,
    showSecondaryButton,
    ...args
}: ModalExampleProps) => {
    const openModalButtonLabel = "Open Modal";
    const primaryButtonLabel = "Primary Button Label";
    const secondaryButtonLabel = "Secondary Button Label";

    const titlePlaceHolderText = "Title";

    const [isOpen, setIsOpen] = useState(false);
    const { isMobile } = useBreakpoints();

    return (
        <>
            <Button
                size="lg"
                label={openModalButtonLabel}
                onClick={() => setIsOpen(true)}
            />
            <Modal
                {...args}
                isOpened={isOpen}
                toggleModal={setIsOpen}
                primaryButtonLabel={primaryButtonLabel}
                showSecondaryButton={showSecondaryButton}
                secondaryButtonLabel={secondaryButtonLabel}
                isMobile={isMobile}
            >
                <Modal.Header
                    title={titlePlaceHolderText}
                    image={image}
                    src={src}
                    style={style}
                />
                <Modal.Body>{textContent}</Modal.Body>
            </Modal>
        </>
    );
};
