import { TRegularSizes } from "@types";

export type TBadgeColorVariants = "success" | "warning" | "danger";
export type TBadgeVariant = "status" | "notification";
export type TBadgePosition =
    | "top-right"
    | "top-left"
    | "top-center"
    | "center"
    | "bottom-right"
    | "bottom-left"
    | "bottom-center";

export type BadgeProps = {
    variant?: TBadgeVariant;
    size?: TRegularSizes;
    color?: TBadgeColorVariants;
    className?: string;
    label?: React.ReactNode | string;
    position?: TBadgePosition;
};
