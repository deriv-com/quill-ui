import ReactDOM from "react-dom";
import { useState, useEffect, useRef, HTMLAttributes } from "react";
import clsx from "clsx";
import { Button, IconButton } from "@components/Button";
import { LabelPairedXmarkMdBoldIcon } from "@deriv/quill-icons/LabelPaired";
import { ModalHeader } from "./modal-header";
import { ModalBody } from "./modal-body";
import "../modal.scss";
import useBreakpoints from "@hooks/useBreakpoints";
import ModalActionSheet, { ModalActionSheetProps } from "./modal-action-sheet";

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
    showPrimaryButton?: boolean;
    primaryButtonLabel?: React.ReactNode;
    isPrimaryButtonDisabled?: boolean;
    isSecondaryButtonDisabled?: boolean;
    primaryButtonCallback?: () => void;
    secondaryButtonCallback?: () => void;
    secondaryButtonLabel?: React.ReactNode;
    isMobile?: boolean;
    hasFooter?: boolean;
    actionSheetProps?: ModalActionSheetProps;
}

export const Modal = ({
    isOpened = false,
    className,
    children,
    showHandleBar,
    showCrossIcon,
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
    actionSheetProps,
    ...rest
}: React.PropsWithChildren<ModalProps>) => {
    const [isVisible, setIsVisible] = useState(isOpened);
    const [isExpanded, setIsExpanded] = useState(false);
    // const [isSwiping, setIsSwiping] = useState(disableCloseOnOverlay);

    // const animationTimerRef = useRef<ReturnType<typeof setTimeout>>();
    // const swipingTimerRef = useRef<ReturnType<typeof setTimeout>>();
    const scrollableContainerRef = useRef<HTMLDivElement>(null);
    const actionSheetRef = useRef<HTMLDivElement>(null);

    const { isMobile } = useBreakpoints();

    const modalRoot =
        (portalId && document.getElementById(portalId)) ||
        document.getElementById("modal-root") ||
        document.body;

    useEffect(() => {
        setIsVisible(isOpened);
    }, [isOpened]);

    // useEffect(() => {
    //     return () => {
    //         clearTimeout(animationTimerRef.current);
    //         clearTimeout(swipingTimerRef.current);
    //     };
    // }, []);

    const toggleHandler = () => {
        setIsVisible((prev) => !prev);

        // animationTimerRef.current = setTimeout(() => {
        //     setIsExpanded(false);
        //     toggleModal && toggleModal(!isOpened);
        // }, 300);
    };

    const primaryButtonFunctionHandler = () => {
        primaryButtonCallback?.();
        if (shouldCloseOnPrimaryButtonClick) toggleHandler();
    };
    const secondaryButtonFunctionHandler = () => {
        secondaryButtonCallback?.();
        if (shouldCloseOnSecondaryButtonClick) toggleHandler();
    };

    const {
        root = {},
        portal = {},
        ...restActionSheetProps
    } = actionSheetProps || {};

    const handleClose = () => {
        if (disableCloseOnOverlay) return;
        if (toggleModal && isVisible) return toggleModal(false);
        setIsVisible(false);
    };

    const updatedRoot = {
        ...root,
        isOpen: isVisible,
        onClose: handleClose,
    };

    console.log(isVisible);

    const updatedPortal = {
        ...portal,
        showHandleBar,
    };

    return !isMobile && isVisible ? (
        ReactDOM.createPortal(
            <div
                {...rest}
                className="quill-modal__background"
                data-testid="dt_overlay"
                // onClick={isSwiping ? undefined : toggleHandler}
                onClick={handleClose}
            >
                <div
                    className={clsx(
                        `quill-modal__container${isMobile ? "--mobile" : "--desktop"}`,
                        {
                            "quill-modal__container--visible": isVisible,
                            "quill-modal__container--expanded": isExpanded,
                        },

                        className,
                    )}
                    onClick={(e) => e.stopPropagation()}
                    ref={scrollableContainerRef}
                >
                    {showCrossIcon && (
                        <IconButton
                            variant="tertiary"
                            color="black-white"
                            size="lg"
                            className="quill-modal__close-icon"
                            onClick={toggleHandler}
                            icon={<LabelPairedXmarkMdBoldIcon />}
                        />
                    )}

                    <div className="quill-modal__content-wrapper">
                        {children}
                    </div>
                    {hasFooter && (
                        <div className="quill-modal__button-wrapper">
                            {showPrimaryButton && (
                                <Button
                                    color="black-white"
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
                </div>
            </div>,
            modalRoot,
        )
    ) : (
        <ModalActionSheet
            root={updatedRoot}
            portal={updatedPortal}
            ref={actionSheetRef}
            {...restActionSheetProps}
        >
            {children}
        </ModalActionSheet>
    );
};
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
