import React, { Children, cloneElement } from "react";
import clsx from "clsx";
import { TGenericSizes } from "../../types";
import "./segmented-control.scss";
import { Typography } from "../Typography/base";

export interface SegmentedControlProps
    extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    size?: Extract<TGenericSizes, "lg" | "md" | "sm">;
}

export interface SegmentedControlItemProps {
    className?: string;
    icon?: string;
    label?: string;
    size?: SegmentedControlProps["size"];
}

export const SegmentedControl = ({
    children,
    className = "segmented-control",
    size = "md",
    ...rest
}: SegmentedControlProps) => (
    <div className={clsx(className, `${className}--${size}`)} {...rest}>
        {children &&
            Children.map(children, (child) =>
                cloneElement(child as JSX.Element, {
                    size:
                        (child as { props: SegmentedControlItemProps })?.props
                            ?.size ?? size,
                }),
            )}
    </div>
);

// TODO: need to import placeholder icons from quill-icons
const Item = ({ className, icon, label, size }: SegmentedControlItemProps) => (
    <div className={clsx("item", className)}>
        {icon && <span className="icon">{icon}</span>}
        {label && (
            <Typography size={size} as="span">
                {label}
            </Typography>
        )}
    </div>
);

SegmentedControl.Item = Item;
