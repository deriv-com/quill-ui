import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Text } from "@components/Typography";
import { StandaloneChevronDownRegularIcon } from "@deriv/quill-icons/Standalone";
import { AccordionProps } from "../types";
import "./accordian-base.scss";

export const Base = ({
    id,
    className,
    title = "",
    subtitle,
    content: Content,
    expanded = false,
    textSize = "md",
    icon,
    isFlush = false,
    divider = "none",
    disabled = false,
    expandedColor = "gray",
    customContent: CustomContent,
    contentClassname,
    onExpand,
}: AccordionProps) => {
    const [isExpanded, setExpanded] = useState(expanded);
    const [isAutoExpand, setAutoExpand] = useState(false);

    const accordionElement = useRef<HTMLDivElement>(null);

    const toggleCollapse = useCallback(() => {
        setExpanded((current) => !current);
        setAutoExpand(false);
        scrollToExpanded(500);

        if (onExpand) {
            onExpand(!isExpanded, title);
        }
    }, [isExpanded, onExpand, title]);

    // Handle Collapse via Keyboard
    const handleKeyUp = useCallback(
        (e: KeyboardEvent) => {
            if (e.code === "Enter" || e.key === "Enter") {
                if (accordionElement.current === document.activeElement) {
                    toggleCollapse();
                }
            }
        },
        [toggleCollapse],
    );

    // Scroll to expanded item
    const scrollToExpanded = (delay = 1000) => {
        const accElement = accordionElement.current;

        if (accElement) {
            setTimeout(() => {
                accElement.scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                });
            }, delay);
        }
    };

    // Handle auto expand and auto scroll on hash targets
    useEffect(() => {
        const hashWithoutSymbol =
            typeof window !== "undefined" && window.location.hash.slice(1);

        if (hashWithoutSymbol === id) {
            setAutoExpand(true);
            scrollToExpanded();
        }
    }, [id]);

    // Key handlers
    useEffect(() => {
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [handleKeyUp]);

    useEffect(() => {
        setExpanded(expanded);
    }, [expanded]);

    return (
        <div
            data-id={id}
            ref={accordionElement}
            tabIndex={0}
            className={clsx(
                "quill-accordion-container",
                `quill-accordion-base-expanded-${expandedColor}`,
                !isFlush && "quill-accordion-radius",
                {
                    divider,
                    className,
                    disabled,
                },
            )}
        >
            <div
                className={clsx(
                    !isFlush && !isExpanded && "quill-accordion-radius",
                    "quill-accordion-base",
                    disabled && "quill-accordion-base-disabled",
                    expandedColor &&
                        isExpanded &&
                        `quill-accordion-base-expanded-${expandedColor}`,
                    contentClassname,
                )}
                onClick={() => toggleCollapse()}
                data-testid="toggle-expand"
            >
                {CustomContent ? (
                    <CustomContent />
                ) : (
                    <>
                        {icon && (
                            <div
                                className="quill-accordion-base-icon"
                                data-testid="accordion-icon"
                            >
                                {icon}
                            </div>
                        )}
                        <div className={"quill-accordion-header"}>
                            <Text
                                className={clsx(
                                    "quill-accordion-base-header-title-color",
                                    `quill-accordion-base-header-title-${textSize}`,
                                    disabled &&
                                        "quill-accordion-base-header-title-disabled",
                                )}
                            >
                                {title}
                            </Text>
                            {subtitle && (
                                <Text
                                    className={clsx(
                                        "quill-accordion-header-subtitle-color",
                                        `quill-accordion-base-header-subtitle-${textSize}`,
                                        disabled &&
                                            "quill-accordion-base-header-subtitle-disabled",
                                    )}
                                >
                                    {subtitle}
                                </Text>
                            )}
                        </div>
                    </>
                )}
                <div
                    className="quill-accordion-icon-rotate"
                    data-state={isExpanded || isAutoExpand ? "open" : "close"}
                    data-testid="chevron"
                >
                    <StandaloneChevronDownRegularIcon iconSize="sm" />
                </div>
            </div>

            <div
                className={clsx(
                    disabled && "quill-accordion-disabled",
                    isAutoExpand || isExpanded
                        ? "quill-accordion-expanded"
                        : "quill-accordion-expanded-visible",
                )}
                data-testid="expanded-content"
            >
                <div className={clsx("quill-accordion-expanded-content")}>
                    {Content && <Content />}
                </div>
            </div>
        </div>
    );
};

Base.displayName = "AccordionBase";

export default Base;