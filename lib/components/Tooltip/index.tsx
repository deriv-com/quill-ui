import {
    ComponentProps,
    ElementType,
    PropsWithChildren,
    ReactNode,
    useState,
} from "react";
import { Popover, ArrowContainer } from "react-tiny-popover";
import clsx from "clsx";
import { TPosition } from "@types";
import { LabelPairedXmarkMdBoldIcon } from "@deriv/quill-icons/LabelPaired";
import { CaptionText } from "@components/Typography";
import { Link } from "@components/Link";
import { Button, ButtonProps } from "@components/Button";
import { LinkProps } from "@components/Link/types";
import "./tooltip.scss";

type AsElement = "a" | "div" | "button";
type TPositionWithoutCenter = Exclude<TPosition, "center">;
type TooltipActionProps = LinkProps | ButtonProps;
type TTooltipMenuIcon<T extends AsElement> = ComponentProps<T> & {
    as?: T;
    tooltipContent: string | JSX.Element;
    tooltipPosition?: TPositionWithoutCenter;
    popoverAlign?: "start" | "center" | "end";
    tooltipColor?: string;
    tooltipAction?: "link" | "button";
    tooltipActionProps?: TooltipActionProps;
    hasArrow?: boolean;
    actionText?: string | ReactNode;
    shouldCloseToolTipOnMouseLeave?: boolean;
    variant?: "base" | "rich";
    title?: string | JSX.Element;
};

export const Tooltip = <T extends AsElement>({
    as,
    tooltipContent,
    shouldCloseToolTipOnMouseLeave = true,
    tooltipPosition,
    variant = "base",
    popoverAlign = "center",
    title,
    actionText,
    tooltipColor = "var(--component-textIcon-normal-prominent)",
    tooltipAction = "link",
    tooltipActionProps,
    hasArrow = true,
    children,
    className,
    ...rest
}: PropsWithChildren<TTooltipMenuIcon<T>>) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const onMouseEnter = () => setShowTooltip(true);
    const onMouseLeave = () => setShowTooltip(false);

    const Tag = as as ElementType;

    return (
        <Popover
            isOpen={showTooltip}
            positions={tooltipPosition}
            align={popoverAlign}
            content={({ position, childRect, popoverRect }) => {
                const content = (
                    <div
                        style={{ backgroundColor: tooltipColor }}
                        className={clsx(
                            "tooltip-content",
                            `tooltip-content__variant-${variant}`,
                        )}
                    >
                        {variant === "rich" ? (
                            <div className="tooltip-content__variant-rich-content">
                                <div className="tooltip-content__variant-rich-text">
                                    <div className="tooltip-content__variant-rich-header">
                                        <CaptionText
                                            color="var(--component-textIcon-inverse-prominent)"
                                            bold
                                            className="tooltip-content__variant-rich-title"
                                        >
                                            {title}
                                        </CaptionText>
                                        <LabelPairedXmarkMdBoldIcon
                                            fill="var(--component-textIcon-inverse-prominent)"
                                            className="tooltip-content__variant-rich-icon"
                                            onClick={() =>
                                                setShowTooltip(false)
                                            }
                                        />
                                    </div>

                                    <CaptionText color="var(--component-textIcon-inverse-default)">
                                        {tooltipContent}
                                    </CaptionText>
                                </div>
                                {tooltipAction === "link" ? (
                                    <Link
                                        color="white"
                                        hasChevron
                                        children={actionText}
                                        {...(tooltipActionProps as LinkProps)}
                                    ></Link>
                                ) : (
                                    <Button
                                        color="white"
                                        variant="secondary"
                                        {...(tooltipActionProps as ButtonProps)}
                                        label={actionText}
                                    ></Button>
                                )}
                            </div>
                        ) : (
                            <CaptionText color="var(--component-textIcon-inverse-default)">
                                {tooltipContent}
                            </CaptionText>
                        )}
                    </div>
                );

                return hasArrow ? (
                    <ArrowContainer
                        position={position}
                        childRect={childRect}
                        popoverRect={popoverRect}
                        arrowColor={tooltipColor}
                        arrowSize={4}
                    >
                        {content}
                    </ArrowContainer>
                ) : (
                    content
                );
            }}
        >
            <Tag
                className={clsx(className)}
                onMouseEnter={onMouseEnter}
                onMouseLeave={shouldCloseToolTipOnMouseLeave && onMouseLeave}
                {...rest}
            >
                {children}
            </Tag>
        </Popover>
    );
};

Tooltip.displayName = "Tooltip";
