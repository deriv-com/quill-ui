import { TMediumSizes } from "@types";
import { ReactNode } from "react";

export interface LinkProps {
    content: ReactNode;
    href: string;
}

export type BreadcrumbProps = {
    size?: TMediumSizes;
    links?: LinkProps[];
    className?: string;
};
