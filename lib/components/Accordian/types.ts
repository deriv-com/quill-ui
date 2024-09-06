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
    expandedColor?: TExpandedColor;
    content?: () => ReactNode;
    customContent?: () => ReactNode;
    isFlush?: boolean;
    onExpand?: (e: boolean, i: string) => void;
};
type TExpandedColor = "white" | "gray";
export interface AccordionTabProps extends Omit<AccordionProps, "content"> {
    tab?: Tab;
    className?: string;
    variant?: keyof AccordionVariants;
    content: {
        className?: string;
        data: AccordionProps[][];
    };
    multiCollapse?: boolean;
}

export type Tab = {
    align?: TabAlign;
    data: TabData[];
};

export type TabData = {
    id: number;
    title: string;
};

export type TabAlign = "center" | "end";

export type AccordionDivider = "none" | "both" | "bottom";
