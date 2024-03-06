import React, { ComponentProps, ElementType } from "react";
import clsx from "clsx";
import { TGenericSizes } from "../../types";
import "./typography.scss";

interface TypographyProps extends ComponentProps<THeaders> {
    size?: Extract<TGenericSizes, "lg" | "md" | "sm" | "xl">;
    as?: ElementType | keyof THeaders;
    bold?: boolean;
    italic?: boolean;
    underlined?: boolean;
}

type THeaders = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const Typography = ({
    children,
    size = "md",
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
                `quill-typography__body-text__size--${size}`,
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

const Hero = ({ children, className, as = "h1", ...rest }: TypographyProps) => {
    return (
        <Typography
            as={as}
            className={clsx("quill-typography__hero", className)}
            {...rest}
        >
            {children}
        </Typography>
    );
};

const H1 = ({ children, className, as = "h1", ...rest }: TypographyProps) => {
    return (
        <Typography
            as={as}
            className={clsx("quill-typography__h1", className)}
            {...rest}
        >
            {children}
        </Typography>
    );
};

const H2 = ({ children, className, as = "h2", ...rest }: TypographyProps) => {
    return (
        <Typography
            as={as}
            className={clsx("quill-typography__h2", className)}
            {...rest}
        >
            {children}
        </Typography>
    );
};

const H3 = ({ children, className, as = "h3", ...rest }: TypographyProps) => {
    return (
        <Typography
            as={as}
            className={clsx("quill-typography__h3", className)}
            {...rest}
        >
            {children}
        </Typography>
    );
};

const H4 = ({ children, className, as = "h4", ...rest }: TypographyProps) => {
    return (
        <Typography
            as={as}
            className={clsx("quill-typography__h4", className)}
            {...rest}
        >
            {children}
        </Typography>
    );
};

const H5 = ({ children, className, as = "h5", ...rest }: TypographyProps) => {
    return (
        <Typography
            as={as}
            className={clsx("quill-typography__h5", className)}
            {...rest}
        >
            {children}
        </Typography>
    );
};

const H6 = ({ children, className, as = "h6", ...rest }: TypographyProps) => {
    return (
        <Typography
            as={as}
            className={clsx("quill-typography__h6", className)}
            {...rest}
        >
            {children}
        </Typography>
    );
};

const BodyText = ({
    children,
    className,
    as = "span",
    ...rest
}: TypographyProps) => {
    return (
        <Typography
            as={as}
            className={clsx("quill-typography__body-text", className)}
            {...rest}
        >
            {children}
        </Typography>
    );
};

export { Hero, H1, H2, H3, H4, H5, H6, Typography, BodyText };
