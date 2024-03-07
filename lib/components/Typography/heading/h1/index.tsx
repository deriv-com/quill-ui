import clsx from "clsx";
import { Typography, TypographyProps } from "../../base";

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

export default H1;
