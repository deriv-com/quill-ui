import { ReactNode, forwardRef } from "react";
import BadgeBase from "./base";
import { BadgeProps } from "./types";
import "./badge.scss";
import { TLargeAndMediumSizes } from "@types";
export interface TBadgeContainer extends BadgeProps {
    position?: "top-right" | "center" | "bottom-right";
    children?: ReactNode;
    badgeClassName?: string;
    contentSize?: TLargeAndMediumSizes;
}

export const Badge = forwardRef<HTMLDivElement, TBadgeContainer>(
    (
        {
            size,
            color,
            label,
            children,
            variant,
            position,
            badgeClassName,
            contentSize = "md",
            ...rest
        },
        ref,
    ) => {
        const badge__position =
            position === "bottom-right"
                ? `badge__position-bottom-${size}`
                : position === "top-right"
                  ? `badge__position-top-${contentSize}`
                  : "badge__position-center";
        return (
            <div className="badge__container">
                <div className="badge__container-children">
                    {children && children}
                </div>
                <BadgeBase
                    {...rest}
                    size={size}
                    color={color}
                    label={label}
                    variant={variant}
                    badgeClassName={badgeClassName}
                    className={badge__position}
                    ref={ref}
                ></BadgeBase>
            </div>
        );
    },
);

export default Badge;
