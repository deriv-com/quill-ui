import React, { ComponentProps, ElementType } from "react";
import { TGenericSizes } from "@types";
import "@quill/quill.scss";
import "@styles/index.scss";
import "./typography.scss";

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
    ...rest
}: TypographyProps) => {
    const tag = typeof as === "string" ? as : undefined;

    return React.createElement(
        tag || "p",
        {
            ...rest,
        },
        children,
    );
};
