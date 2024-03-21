import clsx from "clsx";
import { Typography, TypographyProps } from "../../base";

const H4 = ({ children, className, as = "h4", ...rest }: TypographyProps) => {
    return (
        <Typography
            as={as}
            className={clsx(
                "quill-typography__h4",
                "quill-typography__color--prominent",
                className,
            )}
            {...rest}
        >
            {children}
        </Typography>
    );
};

export default H4;
