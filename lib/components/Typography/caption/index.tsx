import clsx from "clsx";
import { Typography, TypographyProps } from "../base";

const CaptionText = ({
    children,
    className,
    as = "p",
    ...rest
}: TypographyProps) => {
    return (
        <Typography
            as={as}
            className={clsx(`quill-typography__caption-text`, className)}
            {...rest}
        >
            {children}
        </Typography>
    );
};

export default CaptionText;
