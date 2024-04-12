import clsx from "clsx";
import { Typography, TypographyProps } from "../../base";

const Hero = ({ children, className, as = "h1", ...rest }: TypographyProps) => {
    return (
        <Typography
            as={as}
            className={clsx(
                "quill-typography__hero",
                "quill-typography__color--prominent",
                className,
            )}
            {...rest}
        >
            {children}
        </Typography>
    );
};

export default Hero;
