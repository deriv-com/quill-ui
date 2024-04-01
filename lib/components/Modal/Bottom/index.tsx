import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import "./modal-bottom.scss";

interface ModalBottomProps {
    isOpened?: boolean;
    isContentLong?: boolean;
    className?: string;
    toggleModal: (isOpened: boolean) => void;
    portalId?: string;
}

export const ModalBottom = ({
    isOpened = false,
    isContentLong = false,
    className,
    children,
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
        <div className="quill-modal-bottom__wrapper" onClick={toggleHandler}>
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
                {children && children}
            </div>
        </div>,
        modalRoot,
    );
};
