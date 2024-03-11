import clsx from "clsx";
import { Typography, TypographyProps } from "../../base";

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

export default H3;
