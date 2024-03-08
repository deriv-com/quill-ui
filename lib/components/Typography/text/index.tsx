import clsx from "clsx";
import { Typography, TypographyProps } from "../base";
import {
    getTextDecoration,
    getTextWeight,
} from "../../../utils/typography-utils";

const Text = ({
    children,
    className,
    as = "span",
    size,
    italic = false,
    underlined = false,
    bold = false,
    ...rest
}: TypographyProps) => {
    const decoration = getTextDecoration(italic, underlined);
    const weight = getTextWeight(bold);

    return (
        <Typography
            as={as}
            className={clsx(
                `quill-typography__body-text__size--${size}--${weight}--${decoration}`,
                className,
            )}
            {...rest}
        >
            {children}
        </Typography>
    );
};

export default Text;
