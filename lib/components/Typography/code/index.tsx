import clsx from "clsx";
import { Typography, TypographyProps } from "../base";

const CodeText = ({
    children,
    className,
    as = "p",
    size = "md",
    ...rest
}: TypographyProps) => {
    return (
        <Typography
            as={as}
            className={clsx(
                `quill-typography__code-text__size--${size}`,
                className,
            )}
            {...rest}
        >
            {children}
        </Typography>
    );
};

export default CodeText;
