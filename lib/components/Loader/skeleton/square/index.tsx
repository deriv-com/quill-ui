import React from "react";
import SkeletonElement from "../base";
import { CircleProps } from "../circle";
import clsx from "clsx";

export interface SquareProps extends CircleProps {
    height?: number | string;
    rounded?: boolean;
    fullWidth?: boolean;
}

const Square = ({
    className,
    rounded = false,
    width,
    fullWidth = true,
    height = 50,
    style,
    ...rest
}: SquareProps) => {
    return (
        <SkeletonElement
            className={clsx(
                {
                    "quill-loader__skeleton--rounded": rounded,
                    "quill-loader__skeleton--full-width": fullWidth,
                },

                className,
            )}
            style={{ width, minWidth: width, height, ...style }}
            {...rest}
        />
    );
};

Square.displayName = "Skeleton.Square";

export default Square;
