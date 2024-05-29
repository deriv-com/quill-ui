import { TAllSizesExceptExtraSmall } from "@types";
import { LinkHTMLAttributes, ReactNode } from "react";

export type LinkSize = "caption" | TAllSizesExceptExtraSmall;
export type TLinkColor = "black" | "white";

export interface LinkProps extends LinkHTMLAttributes<HTMLAnchorElement> {
    className?: string;
    size?: LinkSize;
    color?: TLinkColor;
    disabled?: boolean;
    icon?: ReactNode;
    hasChevron?: boolean;
    target?: "_blank" | "_self" | "_parent" | "_top";
    children?: React.ReactNode;
}
