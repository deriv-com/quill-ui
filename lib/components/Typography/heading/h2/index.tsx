import clsx from "clsx";
import { Typography, TypographyProps } from "../../base";

const H2 = ({ children, className, as = "h2", ...rest }: TypographyProps) => {
    return (
        <Typography
            as={as}
            className={clsx(
                "quill-typography__h2",
                "quill-typography__color--prominent",
                className,
            )}
            {...rest}
        >
            {children}
        </Typography>
    );
};

export default H2;
