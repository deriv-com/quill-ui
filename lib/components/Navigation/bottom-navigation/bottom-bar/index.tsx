import clsx from "clsx";
import React from "react";
import { BottomActionProps } from "../bottom-action";
import "../bottom-navigation.scss";

export interface BottomBarProps
    extends React.ComponentProps<React.ElementType> {
    showLabels?: boolean;
    as?: React.ElementType;
    value?: number;
    onChange?: (event: React.ChangeEvent<HTMLElement>, value: number) => void;
}

const BottomBar = ({
    as: Element = "div",
    className,
    children,
    onChange,
    value,
    showLabels,
    ...rest
}: BottomBarProps) => {
    return (
        <Element
            className={clsx(
                "quill-navigation-bottom-bar__container",
                className,
            )}
            {...rest}
        >
            {React.Children.map(
                children,
                (child: React.ReactNode, childIndex) => {
                    if (!React.isValidElement<BottomActionProps>(child))
                        return null;

                    const childValue =
                        child.props.value === undefined
                            ? childIndex
                            : child.props.value;

                    return React.cloneElement(child, {
                        selected: childValue === value,
                        showLabel:
                            child.props.showLabel !== undefined
                                ? child.props.showLabel
                                : showLabels,
                        value: childValue,
                        onChange,
                    });
                },
            )}
        </Element>
    );
};

BottomBar.displayName = "Navigation.BottomBar";

export default BottomBar;
