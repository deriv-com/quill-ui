import clsx from "clsx";
import { Typography, TypographyProps } from "../base";
import "../typography.scss";
import {
    getTextDecoration,
    getTextWeight,
} from "../../../utils/typography-utils";

const CaptionText = ({
    children,
    className,
    as = "p",
    italic = false,
    underlined = false,
    bold = true,
    ...rest
}: TypographyProps) => {
    const decoration = getTextDecoration(italic, underlined);
    const weight = getTextWeight(bold);

    return (
        <Typography
            as={as}
            className={clsx(
                `quill-typography__caption-text--${weight}--${decoration}`,
                className,
            )}
            {...rest}
        >
            {children}
        </Typography>
    );
};

export default CaptionText;
