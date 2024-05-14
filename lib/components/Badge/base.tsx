import { forwardRef } from "react";
import { BadgeProps } from "./types";
import clsx from "clsx";
import "./badge.scss";
import { CaptionText, Text } from "@components/Typography";

export const BadgeBase = forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            size = "sm",
            color = "success",
            label,
            variant,
            className,
            badgeClassName,
            ...rest
        },
        ref,
    ) => {
        const labelColor = "badge__base-color";
        const truncatedLabel = label && label.length > 2 ? "99+" : label;
        return (
            <span
                className={clsx(
                    className,
                    badgeClassName,
                    "badge__base",
                    `badge__variant__${variant}--size-${size}`,
                    `badge__color--${color}`,
                )}
                ref={ref}
                {...rest}
            >
                {truncatedLabel &&
                    (size === "sm" ? (
                        <CaptionText bold color={labelColor}>
                            {truncatedLabel}
                        </CaptionText>
                    ) : size === "md" ? (
                        <Text bold color={labelColor}>
                            {truncatedLabel}
                        </Text>
                    ) : size === "lg" ? (
                        <Text size="xl" bold color={labelColor}>
                            {truncatedLabel}
                        </Text>
                    ) : null)}
            </span>
        );
    },
);
export default BadgeBase;
