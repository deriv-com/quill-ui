import { TMediumSizes } from "@types";
import { ReactNode } from "react";

export interface LinkProps {
    content: ReactNode;
    href: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
}

export type BreadcrumbProps = {
    size?: TMediumSizes;
    links?: LinkProps[];
    className?: string;
};
