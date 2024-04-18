import React, { forwardRef } from "react";
import { BaseChipProps } from "../types";
import {
    StandaloneChevronDownRegularIcon,
    StandaloneCircleXmarkRegularIcon,
} from "@deriv/quill-icons";
import "../_chip.scss";
import clsx from "clsx";
import { CaptionText, Text } from "@components/Typography";
import { TRegularSizes } from "@types";

export const ChipIconSizes: Record<
    TRegularSizes,
    { width: number; height: number }
> = {
    sm: {
        width: 11,
        height: 18,
    },
    md: {
        width: 13,
        height: 22,
    },
    lg: {
        width: 14,
        height: 24,
    },
};

export const LabelTextSizes: Record<TRegularSizes, JSX.Element> = {
    sm: <CaptionText />,
    md: <Text />,
    lg: <Text />,
};

export const Base = forwardRef<HTMLButtonElement, BaseChipProps>(
    (
        {
            icon: Icon,
            size = "md",
            label,
            labelTag,
            dismissible = false,
            dropdown = false,
            className,
            isDropdownOpen,
            onChipSelect,
            onDismiss,
            children,
            ...rest
        },
        ref,
    ) => {
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            // if (dismissible || dropdown) return;
            const target = event.currentTarget;
            const isSelected = target.getAttribute("data-state") === "selected";
            const selected_state = isSelected ? "" : "selected";
            target.setAttribute("data-state", selected_state);

            onChipSelect?.(event, !isSelected);
        };

        const handleDismiss = (
            event: React.MouseEvent<SVGSVGElement, MouseEvent>,
        ) => {
            onDismiss?.(event);
        };

        return (
            <button
                onClick={handleClick}
                className={clsx(
                    "quill-chip",
                    `quill-chip__size--${size}`,
                    className,
                )}
                ref={ref}
                {...rest}
            >
                {Icon && <Icon {...ChipIconSizes[size]} />}
                {children}
                {label &&
                    React.cloneElement(LabelTextSizes[size], {
                        ...rest,
                        children: label,
                    })}
                {labelTag && <CaptionText bold>{labelTag}</CaptionText>}
                {dismissible && (
                    <StandaloneCircleXmarkRegularIcon
                        {...ChipIconSizes[size]}
                        onClick={handleDismiss}
                        data-testid="dt-chip-dismissible-btn"
                        className="cursor-pointer"
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

export default Base;
