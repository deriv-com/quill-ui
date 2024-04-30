import { forwardRef } from "react";
import { LabelPairedChevronRightSmRegularIcon } from "@deriv/quill-icons/LabelPaired";
import { LinkProps } from "./types";
import clsx from "clsx";
import "./link.scss";
import { CaptionText, Text } from "@components/Typography";

export const Link = forwardRef<HTMLButtonElement, LinkProps>(
    (
        {
            className,
            size = "md",
            disabled,
            color = "black",
            icon,
            hasChevron = false,
            children,
            ...rest
        },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                {...rest}
                className={clsx("link", `link__color-${color}`, className)}
                disabled={disabled}
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
            </button>
        );
    },
);

Link.displayName = "Link";

export default Link;
