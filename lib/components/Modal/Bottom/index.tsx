import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import "./modal-bottom.scss";
import { ModalTitle } from "./modal-title";
import { ModalBody } from "./modal-body";
import { Button } from "../../Button";

interface ModalBottomProps {
    isOpened?: boolean;
    //TODO: refactor image position and style
    hasImage?: boolean;
    shouldExpand?: boolean;
    className?: string;
    showHandleBar?: boolean;
    showSecondaryButton?: boolean;
    shouldCloseOnPrimaryButtonClick?: boolean;
    toggleModal: (isOpened: boolean) => void;
    portalId?: string;
    primaryButtonLabel?: React.ReactNode;
    primaryButtonFunction?: () => void;
    secondaryButtonLabel?: React.ReactNode;
}

export const ModalBottom = ({
    isOpened = false,
    hasImage = false,
    className,
    children,
    showHandleBar = true,
    showSecondaryButton = true,
    shouldCloseOnPrimaryButtonClick = false,
    shouldExpand = false,
    toggleModal,
    portalId,
    primaryButtonLabel,
    primaryButtonFunction,
    secondaryButtonLabel,
}: React.PropsWithChildren<ModalBottomProps>) => {
    const [isVisible, setIsVisible] = useState(isOpened);
    //TODO: add check for content length
    const [isExpanded, setIsExpanded] = useState(shouldExpand);

    const animationTimerRef = useRef<ReturnType<typeof setTimeout>>();
    const modalRoot =
        (portalId && document.getElementById(portalId)) ||
        document.getElementById("modal-root") ||
        document.body;

    useEffect(() => {
        setIsVisible(isOpened);
    }, [isOpened]);

    useEffect(() => {
        setIsExpanded(shouldExpand);
    }, [shouldExpand]);

    useEffect(() => {
        return () => clearTimeout(animationTimerRef.current);
    }, []);

    const toggleHandler = () => {
        setIsVisible(!isVisible);
        animationTimerRef.current = setTimeout(
            () => toggleModal(!isOpened),
            300,
        );
    };

    const primaryButtonFunctionHandler = () => {
        primaryButtonFunction?.();
        if (shouldCloseOnPrimaryButtonClick) toggleHandler();
    };

    if (!isOpened) return null;

    return ReactDOM.createPortal(
        <div className="quill-modal-bottom__overlay" onClick={toggleHandler}>
            <div
                className={clsx(
                    "quill-modal-bottom__container",
                    {
                        "quill-modal-bottom__container--visible": isVisible,
                        "quill-modal-bottom__container--expanded": isExpanded,
                    },
                    className,
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {showHandleBar && (
                    <div className="quill-modal-bottom__handle-bar" />
                )}
                <div
                    className={clsx("quill-modal-bottom__content-wrapper", {
                        "quill-modal-bottom__content-wrapper--has-image":
                            !!hasImage,
                    })}
                >
                    {children}
                </div>
                <div className="quill-modal-bottom__button-wrapper">
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
                            className="quill-modal-bottom__button"
                            onClick={toggleHandler}
                        />
                    )}
                </div>
            </div>
        </div>,
        modalRoot,
    );
};

ModalBottom.Title = ModalTitle;
ModalBottom.Body = ModalBody;
