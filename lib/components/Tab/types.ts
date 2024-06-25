import { TLeftOrTop } from "@types";
import React, { ComponentProps } from "react";

export type QuillIconComponent = React.ForwardRefExoticComponent<"ref">;
export type TTabSize = "sm" | "md";

export interface TabProps extends ComponentProps<"button"> {
    size?: TTabSize;
    icon?: React.ReactNode;
    iconPosition?: TLeftOrTop;
    className?: string;
    children?: React.ReactNode;
    contentStyle?: "hug" | "fill";
    selectedTabIndex?: number;
    onChangeTab?: (index: number) => void;
}
