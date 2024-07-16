import clsx from "clsx";
import React from "react";
import "../skeleton.scss";

export interface SkeletonBaseProps {
    className?: string;
    style?: React.CSSProperties;
    active?: boolean;
}

const SkeletonElement = ({
    active = true,
    className,
    ...rest
}: SkeletonBaseProps) => {
    return (
        <span
            className={clsx(
                "quill-loader__skeleton",
                {
                    "quill-loader__skeleton--animated": active,
                },
                className,
            )}
            {...rest}
        />
    );
};

export default SkeletonElement;
