import { ComponentProps, forwardRef, useContext } from "react";
import { createPortal } from "react-dom";
import HandleBar from "../handle-bar";
import "./portal.scss";
import { useSwipeBlock } from "@hooks/useSwipeBlock";
import { ActionSheetContext } from "../root";
import clsx from "clsx";

interface PortalProps extends ComponentProps<"div"> {
    shouldCloseOnDrag?: boolean;
    shouldDetectSwipingOnContainer?: boolean;
    showHandlebar?: boolean;
    fullHeightOnOpen?: boolean;
}

const Portal = forwardRef<HTMLDivElement, PortalProps>(
    (
        {
            children,
            shouldCloseOnDrag,
            shouldDetectSwipingOnContainer = false,
            showHandlebar = true,
            fullHeightOnOpen = false,
            ...restProps
        },
        ref,
    ) => {
        const { show, handleClose, className, position, type, expandable } =
            useContext(ActionSheetContext);
        const { height, containerRef, bindHandle, isScrolled, isLg } =
            useSwipeBlock({
                show,
                onClose: handleClose,
                shouldCloseOnDrag,
                fullHeightOnOpen,
            });

        return (
            <>
                {createPortal(
                    <>
                        <div
                            className="quill-action-sheet--portal quill-action-sheet--portal--wrapper"
                            role="dialog"
                            data-state={show ? "open" : "close"}
                            ref={ref}
                            {...restProps}
                        >
                            {type === "modal" && (
                                <div
                                    data-testid="dt-actionsheet-overlay"
                                    onClick={handleClose}
                                    className="quill-action-sheet--portal quill-action-sheet--portal__variant--modal"
                                />
                            )}
                            <div
                                className={clsx(
                                    "quill-action-sheet--root",
                                    `quill-action-sheet--root__show--${show}`,
                                    `quill-action-sheet--root__position--${position}`,
                                    `quill-action-sheet--root__position--${position}__show--${show}`,
                                    className,
                                )}
                                ref={containerRef}
                                style={{ height }}
                                {...(shouldDetectSwipingOnContainer &&
                                !isScrolled &&
                                !isLg &&
                                expandable
                                    ? bindHandle()
                                    : {})}
                            >
                                {showHandlebar && (
                                    <HandleBar
                                        {...(expandable || shouldCloseOnDrag
                                            ? bindHandle()
                                            : {})}
                                    />
                                )}

                                {children}
                            </div>
                        </div>
                    </>,
                    document.body,
                )}
            </>
        );
    },
);

export default Portal;
