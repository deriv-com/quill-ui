import { forwardRef } from "react";
import { BadgeProps } from "./types";
import clsx from "clsx";
import "./badge.scss";
import { CaptionText, Text } from "@components/Typography";

export const BadgeBase = forwardRef<HTMLSpanElement, BadgeProps>(
    (
        { size = "sm", color = "success", label, variant, className, ...rest },
        ref,
    ) => {
        const labelColor = "badge__base-color";
        return (
            <span
                className={clsx(
                    className,
                    "badge__base",
                    `badge__variant__${variant}--size-${size}`,
                    `badge__color--${color}`,
                )}
                ref={ref}
                {...rest}
            >
                {label &&
                    (size === "sm" ? (
                        <CaptionText bold color={labelColor}>
                            {label}
                        </CaptionText>
                    ) : size === "md" ? (
                        <Text bold color={labelColor}>
                            {label}
                        </Text>
                    ) : size === "lg" ? (
                        <Text size="xl" bold color={labelColor}>
                            {label}
                        </Text>
                    ) : null)}
            </span>
        );
    },
);
export default BadgeBase;
