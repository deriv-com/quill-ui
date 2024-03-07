import clsx from "clsx";
import { Typography, TypographyProps } from "../../base";

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

export default H5;
