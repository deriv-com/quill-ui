import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import "./modal-bottom.scss";
import { ModalHeader } from "./modal-header";
import { ModalBody } from "./modal-body";
import { Heading, Text } from "../../Typography";

interface ModalBottomProps {
    isOpened?: boolean;
    isContentLong?: boolean;
    className?: string;
    toggleModal: (isOpened: boolean) => void;
    title: React.ReactNode;
    portalId?: string;
}

export const ModalBottom = ({
    isOpened = false,
    isContentLong = false,
    className,
    children,
    toggleModal,
    title,
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
                <div className="quill-modal-bottom__handle-bar" />
                <div className="quill-modal-bottom__content-wrapper">
                    <Heading.H4 className="quill-modal-bottom__content-title">
                        {title}
                    </Heading.H4>
                    <Text size="md" as="div">
                        {children}
                    </Text>
                </div>
            </div>
        </div>,
        modalRoot,
    );
};

ModalBottom.Header = ModalHeader;
ModalBottom.Body = ModalBody;
