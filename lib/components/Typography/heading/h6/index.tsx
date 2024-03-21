import clsx from "clsx";
import { Typography, TypographyProps } from "../../base";

const H6 = ({ children, className, as = "h6", ...rest }: TypographyProps) => {
    return (
        <Typography
            as={as}
            className={clsx(
                "quill-typography__h6",
                "quill-typography__color--prominent",
                className,
            )}
            {...rest}
        >
            {children}
        </Typography>
    );
};

export default H6;
