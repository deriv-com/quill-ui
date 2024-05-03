import { TRegularSizes } from "@types";

export type TBadgeColorVariants = "success" | "warning" | "danger";
export type TBadgeVariant = "status" | "notification";

export type BadgeProps = {
    variant?: TBadgeVariant;
    size?: TRegularSizes;
    color?: TBadgeColorVariants;
    className?: string;
    label?: string;
    badgeClassName?: string;
};
