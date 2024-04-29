import { forwardRef } from "react";
import { BaseTagProps } from "./types";
import clsx from "clsx";
import { CaptionText, Text } from "@components/Typography";
import "./tag.scss";
import TagIcon from "./tagIcon";

const Tag = forwardRef<HTMLDivElement, BaseTagProps>(
    (
        {
            label,
            className,
            variant = "fill",
            size = "md",
            color = "success",
            isBold = false,
            icon,
            iconClassName,
            ...rest
        },
        ref,
    ) => {
        return (
            <div
                className={clsx(
                    className,
                    "tag",
                    `tag__size-${size}`,
                    `tag__color--${color}`,
                    `tag__color--${color}-${variant}`,
                )}
                {...rest}
                ref={ref}
            >
                <TagIcon
                    isBold={isBold}
                    className={iconClassName}
                    icon={icon}
                    color={color}
                    size={size}
                />

                {size === "sm" || size === "xs" ? (
                    <CaptionText bold={isBold}>{label}</CaptionText>
                ) : (
                    <Text size={size === "md" ? "sm" : "md"} bold={isBold}>
                        {label}
                    </Text>
                )}
            </div>
        );
    },
);

Tag.displayName = "Tag";

export default Tag;