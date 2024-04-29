import { QuillIconComponent } from "@types";
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
    let IconComponent: QuillIconComponent | undefined;

    const TagIcons: Record<
        Exclude<NonNullable<BaseTagProps["color"]>, "custom">,
        {
            bold: QuillIconComponent;
            regular: QuillIconComponent;
        }
    > = {
        error: {
            bold: LabelPairedTriangleExclamationSmBoldIcon,
            regular: LabelPairedTriangleExclamationSmRegularIcon,
        },
        warning: {
            bold: LabelPairedCircleExclamationSmBoldIcon,
            regular: LabelPairedCircleExclamationSmRegularIcon,
        },
        success: {
            bold: LabelPairedCircleCheckSmBoldIcon,
            regular: LabelPairedCircleCheckSmRegularIcon,
        },
        info: {
            bold: LabelPairedCircleInfoSmBoldIcon,
            regular: LabelPairedCircleInfoSmRegularIcon,
        },
    };
    if (color === "custom") {
        IconComponent = Icon;
    } else {
        IconComponent =
            TagIcons[color ?? "success"][isBold ? "bold" : "regular"];
    }
    const TagIconSizes: Record<
        NonNullable<BaseTagProps["size"]>,
        { width: number; height: number }
    > = {
        xs: {
            width: 11,
            height: 18,
        },
        sm: {
            width: 11,
            height: 18,
        },
        md: {
            width: 13,
            height: 22,
        },
        lg: {
            width: 14,
            height: 24,
        },
    };
    return (
        <>
            {Icon && color === "custom" ? (
                <Icon className={className} {...TagIconSizes[size ?? "md"]} />
            ) : (
                <>
                    {IconComponent && (
                        <IconComponent
                            className={clsx(`tag__color--${color}-svg`)}
                            {...TagIconSizes[size ?? "md"]}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default TagIcon;
