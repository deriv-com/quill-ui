import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import "./modal-bottom.scss";
import { ModalTitle } from "./modal-title";
import { ModalBody } from "./modal-body";

interface ModalBottomProps {
    isOpened?: boolean;
    hasImage?: React.ReactNode;
    isContentLong?: boolean;
    className?: string;
    showHandleBar?: boolean;
    showSecondaryButton?: boolean;
    toggleModal: (isOpened: boolean) => void;
    portalId?: string;
}

export const ModalBottom = ({
    isOpened = false,
    isContentLong = false,
    hasImage = false,
    className,
    children,
    showHandleBar = false,
    showSecondaryButton = false,
    toggleModal,
    portalId,
}: React.PropsWithChildren<ModalBottomProps>) => {
    const [isVisible, setIsVisible] = useState(isOpened);
    const [isExpanded, setIsExpanded] = useState(isContentLong);

    const animationTimerRef = useRef<ReturnType<typeof setTimeout>>();
    const modalRoot =
        (portalId && document.getElementById(portalId)) ||
        document.getElementById("modal-root") ||
        document.body;

    useEffect(() => {
        setIsVisible(isOpened);
    }, [isOpened]);

    useEffect(() => {
        setIsExpanded(isContentLong);
    }, [isContentLong]);

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
                {/* TODO: refactor when component button will be merged */}
                <div className="quill-modal-bottom__button-wrapper">
                    <button className="quill-modal-bottom__button quill-modal-bottom__button-1">
                        Label 1
                    </button>
                    {showSecondaryButton && (
                        <button className="quill-modal-bottom__button quill-modal-bottom__button-2">
                            Label 2
                        </button>
                    )}
                </div>
            </div>
        </div>,
        modalRoot,
    );
};

ModalBottom.Title = ModalTitle;
ModalBottom.Body = ModalBody;
