import React from "react";
import SkeletonElement from "../base";

export interface CircleProps {
    className?: string;
    style?: React.CSSProperties;
    width?: number;
    active?: boolean;
}

const Circle = ({ width = 100, ...rest }: CircleProps) => {
    return (
        <SkeletonElement
            shape="circle"
            width={width}
            height={width}
            {...rest}
        />
    );
};

Circle.displayName = "Skeleton.Circle";

export default Circle;
