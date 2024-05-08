import { useEffect, useState } from "react";
import Modal from "..";
import { Button } from "@components/Button";
import "@quill/breakpoints.scss";
import { ModalBase } from "../base/base";

interface ModalExampleProps extends React.ComponentProps<typeof ModalBase> {
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
    const [isMobile, setIsMobile] = useState(false);
    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <Button
                size="lg"
                label={openModalButtonLabel}
                onClick={() => setIsOpen(true)}
            />
            <Modal.Frame
                {...args}
                isMobile={isMobile}
                isOpened={isOpen}
                toggleModal={setIsOpen}
                primaryButtonLabel={primaryButtonLabel}
                showSecondaryButton={showSecondaryButton}
                secondaryButtonLabel={secondaryButtonLabel}
            >
                <Modal.Header
                    title={titlePlaceHolderText}
                    image={image}
                    src={src}
                    style={style}
                />
                <Modal.Body>{textContent}</Modal.Body>
            </Modal.Frame>
        </>
    );
};
