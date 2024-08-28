import ReactDOM from "react-dom";
import { useState, useEffect, HTMLAttributes } from "react";
import clsx from "clsx";
import { Button, IconButton, TButtonColor } from "@components/Button";
import { LabelPairedXmarkMdBoldIcon } from "@deriv/quill-icons/LabelPaired";
import { ModalHeader } from "./modal-header";
import { ModalBody } from "./modal-body";
import "../modal.scss";
import ActionSheet from "@components/ActionSheet";
import React from "react";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    isOpened?: boolean;
    className?: string;
    containerClassName?: string;
    showHandleBar?: boolean;
    showCrossIcon?: boolean;
    showSecondaryButton?: boolean;
    shouldCloseOnPrimaryButtonClick?: boolean;
    shouldCloseOnSecondaryButtonClick?: boolean;
    disableCloseOnOverlay?: boolean;
    toggleModal?: (isOpened: boolean) => void;
    portalId?: string;
    buttonColor?: TButtonColor;
    showPrimaryButton?: boolean;
    primaryButtonLabel?: React.ReactNode;
    isPrimaryButtonDisabled?: boolean;
    isSecondaryButtonDisabled?: boolean;
    primaryButtonCallback?: () => void;
    secondaryButtonCallback?: () => void;
    secondaryButtonLabel?: React.ReactNode;
    isMobile?: boolean;
    hasFooter?: boolean;
}

export const Modal = (props: React.PropsWithChildren<ModalProps>) => {
    const {
        isOpened = false,
        className,
        children,
        showCrossIcon = true,
        showPrimaryButton = true,
        showSecondaryButton = false,
        shouldCloseOnPrimaryButtonClick = false,
        shouldCloseOnSecondaryButtonClick = false,
        toggleModal,
        disableCloseOnOverlay = false,
        hasFooter = true,
        portalId,
        primaryButtonLabel,
        isPrimaryButtonDisabled,
        isSecondaryButtonDisabled,
        primaryButtonCallback,
        secondaryButtonCallback,
        secondaryButtonLabel,
        showHandleBar,
        isMobile,
        buttonColor: primaryButtonColor = "black-white",
        ...rest
    } = props;
    const [isVisible, setIsVisible] = useState(isOpened);

    const modalRoot =
        (portalId && document.getElementById(portalId)) ||
        document.getElementById("modal-root") ||
        document.body;

    useEffect(() => {
        setIsVisible(isOpened);
    }, [isOpened]);

    const primaryButtonFunctionHandler = () => {
        primaryButtonCallback?.();
        if (shouldCloseOnPrimaryButtonClick) handleClose();
    };
    const secondaryButtonFunctionHandler = () => {
        secondaryButtonCallback?.();
        if (shouldCloseOnSecondaryButtonClick) handleClose();
    };

    const handleClose = () => {
        if (toggleModal && isVisible) return toggleModal(false);
        setIsVisible(false);
    };

    const ModalContent = () => (
        <>
            <div className="quill-modal__content-wrapper">{children}</div>
            {hasFooter && (
                <div className="quill-modal__button-wrapper">
                    {showPrimaryButton && (
                        <Button
                            color={primaryButtonColor}
                            fullWidth
                            size="lg"
                            label={primaryButtonLabel}
                            disabled={isPrimaryButtonDisabled}
                            onClick={primaryButtonFunctionHandler}
                        />
                    )}
                    {showSecondaryButton && (
                        <Button
                            color="black-white"
                            fullWidth
                            size="lg"
                            label={secondaryButtonLabel}
                            disabled={isSecondaryButtonDisabled}
                            variant="secondary"
                            className="quill-modal__button"
                            onClick={secondaryButtonFunctionHandler}
                        />
                    )}
                </div>
            )}
        </>
    );

    return !isMobile && isVisible ? (
        ReactDOM.createPortal(
            <div
                {...rest}
                className="quill-modal__background"
                data-testid="dt_overlay"
                onClick={() => {
                    if (disableCloseOnOverlay) return;
                    handleClose();
                }}
            >
                <div
                    className={clsx("quill-modal__container", className)}
                    onClick={(e) => e.stopPropagation()}
                >
                    {showCrossIcon && (
                        <IconButton
                            variant="tertiary"
                            color="black-white"
                            size="lg"
                            className="quill-modal__close-icon"
                            onClick={handleClose}
                            icon={<LabelPairedXmarkMdBoldIcon />}
                        />
                    )}
                    <ModalContent />
                </div>
            </div>,
            modalRoot,
        )
    ) : (
        <ActionSheet.Root isOpen={isOpened} onClose={handleClose}>
            <ActionSheet.Portal
                {...rest}
                showHandlebar={showHandleBar}
                handleBarPosition="absolute"
                disableCloseOnOverlay={disableCloseOnOverlay}
                portalId={portalId}
            >
                <ModalContent />
            </ActionSheet.Portal>
        </ActionSheet.Root>
    );
};
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
