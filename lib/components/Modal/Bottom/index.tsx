import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import "./modal-bottom.scss";
import { useSwipeable } from "react-swipeable";
import { ModalTitle } from "./modal-title";
import { ModalBody } from "./modal-body";
import { Button } from "../../Button";

interface ModalBottomProps {
    isOpened?: boolean;
    //TODO: refactor image position and style
    hasImage?: boolean;
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

const swipeConfig = {
    delta: 10,
    trackTouch: true,
    trackMouse: true,
    preventScrollOnSwipe: true,
};

const maxExpandedHeight = 85;

export const ModalBottom = ({
    isOpened = false,
    hasImage = false,
    className,
    children,
    showHandleBar = true,
    showSecondaryButton = true,
    shouldCloseOnPrimaryButtonClick = false,
    toggleModal,
    portalId,
    primaryButtonLabel,
    primaryButtonFunction,
    secondaryButtonLabel,
}: React.PropsWithChildren<ModalBottomProps>) => {
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
              ) < maxExpandedHeight
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
            toggleModal(!isOpened);
        }, 300);
    };

    const primaryButtonFunctionHandler = () => {
        primaryButtonFunction?.();
        if (shouldCloseOnPrimaryButtonClick) toggleHandler();
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
            className="quill-modal-bottom__overlay"
            onClick={isSwiping ? undefined : toggleHandler}
        >
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
                ref={scrollableContainerRef}
            >
                {showHandleBar && (
                    <div
                        className="quill-modal-bottom__handle-bar"
                        {...swipeHandlers}
                    />
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
