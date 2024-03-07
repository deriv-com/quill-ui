import clsx from "clsx";
import { Typography, TypographyProps } from "../base";

const BodyText = ({
    children,
    className,
    as = "span",
    size,
    ...rest
}: TypographyProps) => {
    return (
        <Typography
            as={as}
            className={clsx(
                `quill-typography__body-text__size--${size}`,
                className,
            )}
            {...rest}
        >
            {children}
        </Typography>
    );
};

export default BodyText;
