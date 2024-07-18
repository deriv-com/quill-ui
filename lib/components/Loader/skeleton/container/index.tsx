import clsx from "clsx";
import React, { ReactElement, ReactNode } from "react";
import "./skeleton-container.scss";

export interface SkeletonContainerProps {
    className?: string;
    direction?: "row" | "column";
    alignment?: "left" | "center" | "right";
    children?: ReactNode;
    style?: React.CSSProperties;
    gap?: number;
    skeletonWidth?: number | string;
    skeletonHeight?: number | string;
    fullWidth?: boolean;
}

const Container = ({
    className,
    direction = "column",
    gap = 10,
    style,
    children,
    skeletonWidth,
    skeletonHeight,
    fullWidth = true,
    alignment = "left",
    ...rest
}: SkeletonContainerProps) => {
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            const displayname = (child.type as React.ComponentType<ReactNode>)
                ?.displayName;
            const props = child.props;

            return React.cloneElement(child as ReactElement, {
                width: !props.fullWidth && (props.width || skeletonWidth),
                height: props.height || skeletonHeight,
                // fullWidth: displayname !== "Skeleton.Container",
                ...props,
            });
        }
        return child;
    });

    return (
        <div
            className={clsx(
                "quill-skeleton-container",
                `quill-skeleton-container__direction--${direction}`,
                `quill-skeleton-container__alignment--${direction}-${alignment}`,
                {
                    "quill-skeleton-container__full-width": fullWidth,
                },
                className,
            )}
            style={{ gap: gap, ...style }}
            {...rest}
        >
            {childrenWithProps}
        </div>
    );
};

Container.displayName = "Skeleton.Container";

export default Container;
