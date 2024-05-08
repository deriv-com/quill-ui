import ReactDOM from "react-dom";
import { useState, useEffect, useRef, HTMLAttributes } from "react";
import clsx from "clsx";
import "../modal.scss";
import { useSwipeable } from "react-swipeable";
import { Button } from "@components/Button";
import { LabelPairedXmarkMdBoldIcon } from "@deriv/quill-icons/LabelPaired";
import { ModalHeader } from "./modal-header";
import { ModalBody } from "./modal-body";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    isOpened?: boolean;
    className?: string;
    containerClassName?: string;
    showHandleBar?: boolean;
    showCrossIcon?: boolean;
    showSecondaryButton?: boolean;
    shouldCloseOnPrimaryButtonClick?: boolean;
    shouldCloseOnSecondaryButtonClick?: boolean;
    toggleModal?: (isOpened: boolean) => void;
    portalId?: string;
    primaryButtonLabel?: React.ReactNode;
    primaryButtonCallback?: () => void;
    secondaryButtonCallback?: () => void;
    secondaryButtonLabel?: React.ReactNode;
    isMobile?: boolean;
}

const swipeConfig = {
    delta: 10,
    trackTouch: true,
    trackMouse: true,
    preventScrollOnSwipe: true,
};

const MAX_HEIGHT = 85;

export const Modal = ({
    isOpened = false,
    className,
    children,
    showHandleBar,
    showSecondaryButton = false,
    shouldCloseOnPrimaryButtonClick = false,
    shouldCloseOnSecondaryButtonClick = false,
    toggleModal,
    isMobile,
    portalId,
    primaryButtonLabel,
    primaryButtonCallback,
    secondaryButtonCallback,
    secondaryButtonLabel,
    ...rest
}: React.PropsWithChildren<ModalProps>) => {
    const [isVisible, setIsVisible] = useState(isOpened);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSwiping, setIsSwiping] = useState(false);

    const animationTimerRef = useRef<ReturnType<typeof setTimeout>>();
    const swipingTimerRef = useRef<ReturnType<typeof setTimeout>>();
    const scrollableContainerRef = useRef<HTMLDivElement>(null);

    const modalRoot =
        (portalId && document.getElementById(portalId)) ||
        document.getElementById("modal-root") ||
        document.body;

    const shouldExpand =
        scrollableContainerRef?.current?.offsetHeight && !isExpanded
            ? Math.round(
                  (scrollableContainerRef?.current?.offsetHeight /
                      window.innerHeight) *
                      100,
              ) < MAX_HEIGHT
            : true;

    useEffect(() => {
        setIsVisible(isOpened);
    }, [isOpened]);

    useEffect(() => {
        return () => {
            clearTimeout(animationTimerRef.current);
            clearTimeout(swipingTimerRef.current);
        };
    }, []);

    const toggleHandler = () => {
        setIsVisible(!isVisible);
        animationTimerRef.current = setTimeout(() => {
            setIsExpanded(false);
            toggleModal && toggleModal(!isOpened);
        }, 300);
    };

    const primaryButtonFunctionHandler = () => {
        primaryButtonCallback?.();
        if (shouldCloseOnPrimaryButtonClick) toggleHandler();
    };
    const secondaryButtonFunctionHandler = () => {
        secondaryButtonCallback?.();
        if (shouldCloseOnSecondaryButtonClick) toggleHandler();
    };

    const swipeHandlers = useSwipeable({
        onSwipedUp: () => (shouldExpand ? setIsExpanded(true) : null),
        onSwipedDown: () =>
            shouldExpand ? setIsExpanded(false) : toggleHandler(),
        onSwipeStart: () => setIsSwiping(true),
        onSwiped: () =>
            (swipingTimerRef.current = setTimeout(
                () => setIsSwiping(false),
                300,
            )),
        ...swipeConfig,
    });
    if (!isOpened) return null;

    return ReactDOM.createPortal(
        <div
            {...rest}
            className="quill-modal__background"
            data-testid="dt_overlay"
            onClick={isSwiping ? undefined : toggleHandler}
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
                {isMobile ? (
                    showHandleBar && (
                        <div
                            className="quill-modal__handle-bar"
                            data-testid="dt_handlebar"
                            {...swipeHandlers}
                        />
                    )
                ) : (
                    <LabelPairedXmarkMdBoldIcon
                        className="quill-modal__close-icon"
                        onClick={toggleHandler}
                    />
                )}

                <div className="quill-modal__content-wrapper">{children}</div>
                <div className="quill-modal__button-wrapper">
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
                            className="quill-modal__button"
                            onClick={secondaryButtonFunctionHandler}
                        />
                    )}
                </div>
            </div>
        </div>,
        modalRoot,
    );
};
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
