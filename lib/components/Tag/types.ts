import { ReactNode } from "react";
import { TRegularSizesWithExtraSmall } from "@types";

export type BaseTagProps = {
    variant?: "fill" | "outline" | "custom";
    color?: "error" | "success" | "custom" | "warning" | "info" | string;
    isBold?: boolean;
    icon?: ReactNode;
    iconClassName?: string;
    size?: TRegularSizesWithExtraSmall;
    label?: ReactNode;
    className?: string;
    showIcon?: boolean;
};
