import React, { ComponentProps, ElementType } from "react";
import { TGenericSizes } from "@types";
import "@styles/index.scss";
import "./typography.scss";
import clsx from "clsx";

export interface TypographyProps extends ComponentProps<THeaders> {
    size?: Extract<TGenericSizes, "lg" | "md" | "sm" | "xl">;
    as?: ElementType | keyof THeaders;
    bold?: boolean;
    italic?: boolean;
    underlined?: boolean;
    color?: string;
    centered?: boolean;
}

type THeaders = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export const Typography = ({
    children,
    as = "p",
    centered = false,
    className,
    ...rest
}: TypographyProps) => {
    const tag = typeof as === "string" ? as : undefined;

    return React.createElement(
        tag || "p",
        {
            className: clsx(centered && "quill-typography-centered", className),
            ...rest,
        },
        children,
    );
};
