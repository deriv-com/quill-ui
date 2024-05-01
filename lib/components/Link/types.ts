import { TAllSizesExceptExtraSmall } from "@types";
import { ReactNode } from "react";

export type LinkSize = "caption" | TAllSizesExceptExtraSmall;
export type TLinkColor = "black" | "white";

export type LinkProps = {
    className?: string;
    size?: LinkSize;
    color?: TLinkColor;
    disabled?: boolean;
    icon?: ReactNode;
    hasChevron?: boolean;
    children: React.ReactNode;
};
