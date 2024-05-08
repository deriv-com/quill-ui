import React, { forwardRef } from "react";
import { BaseChipProps } from "../types";
import {
    StandaloneChevronDownRegularIcon,
    StandaloneCircleXmarkRegularIcon,
} from "@deriv/quill-icons";
import "./chip.scss";
import clsx from "clsx";
import { CaptionText, Text } from "@components/Typography";
import { TRegularSizes } from "@types";

export const LabelTextSizes: Record<TRegularSizes, JSX.Element> = {
    sm: <CaptionText />,
    md: <Text />,
    lg: <Text />,
};

export const Chip = forwardRef<HTMLButtonElement, BaseChipProps>(
    (
        {
            icon: Icon,
            size = "md",
            label,
            labelTag,
            dismissible = false,
            dropdown = false,
            className,
            selected,
            isDropdownOpen,
            onChipSelect,
            onDismiss,
            children,
            ...rest
        },
        ref,
    ) => {
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            if (dismissible || dropdown) return;
            if (selected === undefined) {
                const target = event.currentTarget;
                const isSelected =
                    target.getAttribute("data-state") === "selected";
                const selected_state = isSelected ? "" : "selected";
                target.setAttribute("data-state", selected_state);

                onChipSelect?.(event, !isSelected);
            } else {
                onChipSelect?.(event, selected);
            }
        };

        const handleDismiss = (
            event: React.MouseEvent<SVGSVGElement, MouseEvent>,
        ) => {
            onDismiss?.(event);
        };

        const customRightPadding = dismissible || dropdown;

        return (
            <button
                onClick={handleClick}
                className={clsx(
                    "quill-chip",
                    `quill-chip__size--${size}`,
                    customRightPadding &&
                        `quill-chip__custom-right-padding__size--${size}`,
                    className,
                )}
                data-state={selected ? "selected" : ""}
                ref={ref}
                {...rest}
            >
                {Icon && <Icon />}
                {label &&
                    React.cloneElement(LabelTextSizes[size], {
                        children: label,
                    })}
                {children}
                {labelTag && <CaptionText bold>{labelTag}</CaptionText>}
                {dismissible && (
                    <StandaloneCircleXmarkRegularIcon
                        iconSize="sm"
                        onClick={handleDismiss}
                        data-testid="dt-chip-dismissible-btn"
                        className="dismissible-icon"
                    />
                )}
                {dropdown && (
                    <StandaloneChevronDownRegularIcon
                        width={24}
                        height={24}
                        data-state={isDropdownOpen ? "open" : "close"}
                        className="rotate"
                    />
                )}
            </button>
        );
    },
);

export default Chip;
