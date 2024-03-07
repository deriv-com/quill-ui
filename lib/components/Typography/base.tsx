import React, { ComponentProps, ElementType } from "react";
import clsx from "clsx";
import { TGenericSizes } from "../../types";
import "./typography.scss";

export interface TypographyProps extends ComponentProps<THeaders> {
    size?: Extract<TGenericSizes, "lg" | "md" | "sm" | "xl">;
    as?: ElementType | keyof THeaders;
    bold?: boolean;
    italic?: boolean;
    underlined?: boolean;
}

type THeaders = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export const Typography = ({
    children,
    className,
    as = "p",
    bold = false,
    italic = false,
    underlined = false,
    ...rest
}: TypographyProps) => {
    const tag = typeof as === "string" ? as : undefined;

    return React.createElement(
        tag || "p",
        {
            className: clsx(
                bold && `quill-typography__emphasis--bold`,
                italic && `quill-typography__emphasis--italic`,
                underlined && `quill-typography__emphasis--underlined`,
                className,
            ),
            ...rest,
        },
        children,
    );
};
