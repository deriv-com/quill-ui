import React from "react";
import SkeletonElement, { SkeletonProps } from "../base";

const Square = ({ ...rest }: Omit<SkeletonProps, "shape">) => {
    return <SkeletonElement {...rest} />;
};

Square.displayName = "Skeleton.Square";

export default Square;
