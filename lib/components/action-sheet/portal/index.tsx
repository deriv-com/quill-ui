import { ComponentProps, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import HandleBar from "../handle-bar";
import "./portal.scss";
import { useSwipeBlock } from "../../../hooks";
import { ActionSheetContext } from "../root";
import clsx from "clsx";

type PortalProps = ComponentProps<"div">;

const Portal = ({ children, ...restProps }: PortalProps) => {
    const { show, handleClose, className, position, type, expandable } =
        useContext(ActionSheetContext);
    const { height, containerRef, bindHandle, isScrolled, isLg } =
        useSwipeBlock({
            show,
            onClose: handleClose,
        });

    // TODO: This is a temp implementation
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            {createPortal(
                <>
                    <div
                        className="quill-action-sheet--portal quill-action-sheet--portal--wrapper"
                        role="dialog"
                        data-state={show ? "open" : "close"}
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
                            {...(!isScrolled && !isLg && expandable
                                ? bindHandle()
                                : {})}
                        >
                            {expandable && <HandleBar {...bindHandle()} />}
                            {children}
                        </div>
                    </div>
                </>,
                document.body,
            )}
        </>
    );
};

Portal.displayName = "Portal";

export default Portal;
