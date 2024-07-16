import React from "react";
import SkeletonElement, { SkeletonBaseProps } from "../base";
import clsx from "clsx";

export interface CircleProps extends SkeletonBaseProps {
    width?: number;
}

const Circle = ({ width = 100, className, style, ...rest }: CircleProps) => {
    return (
        <SkeletonElement
            className={clsx("quill-loader__skeleton--circle", className)}
            style={{ width, height: width, ...style }}
            {...rest}
        />
    );
};

Circle.displayName = "Skeleton.Circle";

export default Circle;
