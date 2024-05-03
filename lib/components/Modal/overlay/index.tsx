import { useState, useEffect, HTMLAttributes } from "react";
import clsx from "clsx";
import "./modal-overlay.scss";
import { ModalOverlayHeader } from "./modal-overlay-header";
import { ModalOverlayBody } from "./modal-overlay-body";
import { LabelPairedXmarkMdBoldIcon } from "@deriv/quill-icons/LabelPaired";
import ReactDOM from "react-dom";
import { Button } from "@components/Button";

export interface ModalOverlayProps extends HTMLAttributes<HTMLDivElement> {
    isOpened?: boolean;
    className?: string;
    toggleModal: (isOpened: boolean) => void;
    portalId?: string;
    primaryButtonCallback?: () => void;
    primaryButtonLabel?: React.ReactNode;
    secondaryButtonCallback?: () => void;
    secondaryButtonLabel?: React.ReactNode;
    shouldCloseOnPrimaryButtonClick?: boolean;
    shouldCloseOnSecondaryButtonClick?: boolean;
    showSecondaryButton?: boolean;
}

export const ModalOverlay = ({
    isOpened = false,
    className,
    children,
    toggleModal,
    primaryButtonCallback,
    primaryButtonLabel,
    secondaryButtonCallback,
    secondaryButtonLabel,
    shouldCloseOnPrimaryButtonClick,
    shouldCloseOnSecondaryButtonClick,
    showSecondaryButton,
    portalId,
    ...rest
}: React.PropsWithChildren<ModalOverlayProps>) => {
    const [isVisible, setIsVisible] = useState(isOpened);

    const modalRoot =
        (portalId && document.getElementById(portalId)) ||
        document.getElementById("modal-root") ||
        document.body;

    useEffect(() => {
        setIsVisible(isOpened);
    }, [isOpened]);

    const toggleHandler = () => {
        setIsVisible(!isVisible);
        toggleModal(!isVisible);
    };
    const primaryButtonFunctionHandler = () => {
        primaryButtonCallback?.();
        if (shouldCloseOnPrimaryButtonClick) toggleHandler();
    };
    const secondaryButtonFunctionHandler = () => {
        secondaryButtonCallback?.();
        if (shouldCloseOnSecondaryButtonClick) toggleHandler();
    };

    if (!isOpened) return null;

    return ReactDOM.createPortal(
        <div
            {...rest}
            className="quill-modal-overlay__background"
            data-testid="dt_overlay"
            onClick={toggleHandler}
        >
            <div
                className={clsx(
                    "quill-modal-overlay__container",
                    {
                        "quill-modal-overlay__container--visible": isVisible,
                    },
                    className,
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="quill-modal-overlay__content-wrapper">
                    <LabelPairedXmarkMdBoldIcon
                        className="quill-modal-overlay__close-icon"
                        onClick={toggleHandler}
                    />
                    {children}
                </div>
                <div className="quill-modal-overlay__button-wrapper">
                    <Button
                        color="black"
                        fullWidth
                        size="lg"
                        label={primaryButtonLabel}
                        onClick={primaryButtonFunctionHandler}
                    />
                    {showSecondaryButton && (
                        <Button
                            color="black"
                            fullWidth
                            size="lg"
                            label={secondaryButtonLabel}
                            variant="secondary"
                            className="quill-modal-overlay__button"
                            onClick={secondaryButtonFunctionHandler}
                        />
                    )}
                </div>
            </div>
        </div>,
        modalRoot,
    );
};
ModalOverlay.Header = ModalOverlayHeader;
ModalOverlay.Body = ModalOverlayBody;
