import { BaseTagProps } from "../types";
import {
    LabelPairedCircleCheckSmBoldIcon,
    LabelPairedCircleCheckSmRegularIcon,
    LabelPairedCircleExclamationSmBoldIcon,
    LabelPairedCircleExclamationSmRegularIcon,
    LabelPairedCircleInfoSmBoldIcon,
    LabelPairedCircleInfoSmRegularIcon,
    LabelPairedTriangleExclamationSmBoldIcon,
    LabelPairedTriangleExclamationSmRegularIcon,
} from "@deriv/quill-icons/LabelPaired";
import "../tag.scss";
import clsx from "clsx";

export const TagIcon = ({
    icon: Icon,
    size,
    className,
    isBold,
    color,
}: BaseTagProps) => {
    const TagIcons: Record<
        Exclude<NonNullable<BaseTagProps["color"]>, "custom">,
        {
            bold: React.ReactNode;
            regular: React.ReactNode;
        }
    > = {
        error: {
            bold: <LabelPairedTriangleExclamationSmBoldIcon />,
            regular: <LabelPairedTriangleExclamationSmRegularIcon />,
        },
        warning: {
            bold: <LabelPairedCircleExclamationSmBoldIcon />,
            regular: <LabelPairedCircleExclamationSmRegularIcon />,
        },
        success: {
            bold: <LabelPairedCircleCheckSmBoldIcon />,
            regular: <LabelPairedCircleCheckSmRegularIcon />,
        },
        info: {
            bold: <LabelPairedCircleInfoSmBoldIcon />,
            regular: <LabelPairedCircleInfoSmRegularIcon />,
        },
    };

    let IconComponent: React.ReactNode;
    if (color === "custom") {
        IconComponent = Icon;
    } else {
        IconComponent =
            TagIcons[color ?? "success"][isBold ? "bold" : "regular"];
    }

    return (
        <>
            {Icon && color === "custom" ? (
                <div
                    className={clsx(
                        `tag__icon`,
                        `tag__icon--${size}`,
                        className,
                    )}
                >
                    {Icon}
                </div>
            ) : (
                <>
                    {IconComponent && (
                        <div
                            className={clsx(
                                `tag__icon`,
                                `tag__color--${color}-svg`,
                                `tag__icon--${size}`,
                            )}
                        >
                            {IconComponent}
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default TagIcon;
