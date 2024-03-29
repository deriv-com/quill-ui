import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import clsx from "clsx";
import "./modal-bottom.scss";

interface ModalBottomProps {
    isOpened?: boolean;
    className?: string;
}

export const ModalBottom = ({
    isOpened = false,
    className,
    children,
}: React.PropsWithChildren<ModalBottomProps>) => {
    const [isVisible, setIsVisible] = useState(isOpened);

    useEffect(() => {
        setIsVisible(isOpened);
    }, [isOpened]);

    return (
        isVisible &&
        ReactDOM.createPortal(
            <div className="quill-modal-bottom__wrapper">
                <div
                    className={clsx("quill-modal-bottom__container", className)}
                >
                    {children && children}
                </div>
            </div>,
            document.getElementById("modal-root") as HTMLElement,
        )
    );
};
