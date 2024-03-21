import clsx from "clsx";
import { Typography, TypographyProps } from "../base";
import {
    getTextDecoration,
    getTextWeight,
} from "../../../utils/typography-utils";

export const CodeText = ({
    children,
    className,
    as = "code",
    size = "md",
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
                `quill-typography__code-text__size--${size}__weight--${weight}__decoration--${decoration}`,
                "quill-typography__color--default",
                className,
            )}
            {...rest}
        >
            {children}
        </Typography>
    );
};
