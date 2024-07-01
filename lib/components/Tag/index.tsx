import { forwardRef } from "react";
import { BaseTagProps } from "./types";
import clsx from "clsx";
import { CaptionText, Text } from "@components/Typography";
import "./tag.scss";
import TagIcon from "./tagIcon";

export const Tag = forwardRef<HTMLDivElement, BaseTagProps>(
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
            showIcon = true,
            ...rest
        },
        ref,
    ) => {
        const tagColor = variant === "custom" ? "custom" : color;
        return (
            <div
                className={clsx(
                    className,
                    "tag",
                    `tag__size-${size}`,
                    `tag__color--${tagColor}`,
                    `tag__color--${tagColor}-${variant}`,
                )}
                style={
                    variant === "custom"
                        ? { backgroundColor: color }
                        : undefined
                }
                {...rest}
                ref={ref}
            >
                {showIcon && (
                    <TagIcon
                        isBold={isBold}
                        className={iconClassName}
                        icon={icon}
                        color={tagColor}
                        size={size}
                    />
                )}

                {size === "sm" || size === "xs" ? (
                    <CaptionText bold={isBold} color={tagColor}>
                        {label}
                    </CaptionText>
                ) : (
                    <Text
                        size={size === "md" ? "sm" : "md"}
                        bold={isBold}
                        color={tagColor}
                    >
                        {label}
                    </Text>
                )}
            </div>
        );
    },
);

Tag.displayName = "Tag";

export default Tag;
