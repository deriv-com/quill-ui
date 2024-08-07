import { forwardRef } from "react";
import { LabelPairedChevronRightSmRegularIcon } from "@deriv/quill-icons/LabelPaired";
import { LinkProps } from "./types";
import clsx from "clsx";
import "./link.scss";
import { CaptionText, Text } from "@components/Typography";

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
    (
        {
            className,
            size = "md",
            disabled,
            color = "black",
            icon,
            hasHoverEffect = true,
            hasChevron = false,
            children,
            target = "_blank",
            href,
            ...rest
        },
        ref,
    ) => {
        return (
            <a
                ref={ref}
                target={target}
                href={disabled ? "javascript:void(0)" : href}
                {...rest}
                className={clsx(
                    "link",
                    `link__color-${color}`,
                    disabled && "link--disabled",
                    hasHoverEffect && "link--hover",
                    className,
                )}
            >
                {icon && (
                    <span data-testid="dt-link-icon" className="link__icon">
                        {icon}
                    </span>
                )}
                {size === "caption" ? (
                    <CaptionText color={color}>{children}</CaptionText>
                ) : (
                    <Text
                        color={color}
                        size={
                            size === "sm"
                                ? "sm"
                                : size === "lg"
                                  ? "lg"
                                  : size === "xl"
                                    ? "xl"
                                    : "md"
                        }
                    >
                        {children}
                    </Text>
                )}

                {hasChevron && (
                    <LabelPairedChevronRightSmRegularIcon
                        data-testid="dt-link-chevron"
                        className={clsx(
                            `link__icon-color-${color}`,
                            `link__icon-size-${size}`,
                        )}
                    />
                )}
            </a>
        );
    },
);

Link.displayName = "Link";

export default Link;
