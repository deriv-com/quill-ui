import { ReactNode } from "react";
import { AccordionVariants } from ".";
import { TRegularSizes } from "@types";

export type AccordionProps = {
    id?: string;
    className?: string;
    title?: string;
    subtitle?: string;
    icon?: ReactNode;
    color?: string;
    textSize?: TRegularSizes;
    expanded?: boolean;
    divider?: AccordionDivider;
    disabled?: boolean;
    contentClassname?: string;
    content?: () => ReactNode;
    customContent?: () => ReactNode;
    onExpand?: (e: boolean, i: string) => void;
};

export interface AccordionTabProps extends Omit<AccordionProps, "content"> {
    className?: string;
    variant?: keyof AccordionVariants;
    content: {
        className?: string;
        data: AccordionProps[][];
    };
    multiCollapse?: boolean;
}

export type AccordionDivider = "none" | "both" | "bottom";
