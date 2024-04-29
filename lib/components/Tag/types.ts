import { ReactNode } from "react";
import { QuillIconComponent, TRegularSizesWithExtraSmall } from "@types";

export type BaseTagProps = {
    variant?: "fill" | "outline" | "custom";
    color?: "error" | "success" | "custom" | "warning" | "info";
    isBold?: boolean;
    icon?: QuillIconComponent;
    iconClassName?: string;
    size?: TRegularSizesWithExtraSmall;
    label?: ReactNode;
    className?: string;
};
