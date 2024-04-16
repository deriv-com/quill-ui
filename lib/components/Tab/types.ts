import React, { ComponentProps } from "react";

export type QuillIconComponent = React.ForwardRefExoticComponent<"ref">;
export type TTabSize = "sm" | "md";

export interface TabProps extends ComponentProps<"button"> {
    size?: TTabSize;
    icon?: React.ReactNode;
    iconPosition?: "left" | "top";
    className?: string;
    children?: React.ReactNode;
}
