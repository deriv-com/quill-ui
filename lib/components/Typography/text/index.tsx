import clsx from "clsx";
import { Typography, TypographyProps } from "../base";
import {
    getTextDecoration,
    getTextWeight,
} from "../../../utils/typography-utils";

export const Text = ({
    children,
    className,
    as = "p",
    size = "md",
    italic = false,
    is_disabled = false,
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
                `quill-typography__body-text__size--${size}__weight--${weight}__decoration--${decoration}`,
                "quill-typography__color--default",
                {
                    "quill-typography__color--disabled": is_disabled,
                },
                className,
            )}
            {...rest}
        >
            {children}
        </Typography>
    );
};
