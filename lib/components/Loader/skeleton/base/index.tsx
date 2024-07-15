import clsx from "clsx";
import React from "react";
import { CircleProps } from "../circle";
import "../skeleton.scss";

export interface SkeletonProps extends CircleProps {
    shape?: "circle" | "square";
    height?: number;
    rounded?: boolean;
    fullWidth?: boolean;
}

const SkeletonElement = ({
    width = 100,
    height = 100,
    rounded = false,
    shape = "square",
    active = true,
    style,
    className,
    fullWidth,
    ...rest
}: SkeletonProps) => {
    return (
        <span
            className={clsx(
                "quill-loader__skeleton",
                {
                    "quill-loader__skeleton--animated": active,
                    "quill-loader__skeleton--rounded": rounded,
                    "quill-loader__skeleton--circle": shape === "circle",
                },
                className,
            )}
            style={{
                width: fullWidth ? "100%" : width,
                height,
                ...style,
            }}
            {...rest}
        />
    );
};

export default SkeletonElement;
