import React from "react";
import { BottomBarProps } from "./bottom-bar";
import clsx from "clsx";
import { CaptionText } from "@components/Typography";

export interface BottomActionProps extends Omit<BottomBarProps, "showLabels"> {
    selected?: boolean;
    label?: string | React.ReactNode;
    showLabel?: boolean;
    icon: React.ReactNode;
    activeIcon: React.ReactNode;
}

const BottomAction = (props: BottomActionProps) => {
    const {
        as: Element = "div",
        label,
        children,
        icon,
        activeIcon,
        className,
        showLabel,
        selected,
        onChange,
        onClick,
        value,
        ...rest
    } = props;

    const handleChange = (event: React.ChangeEvent<HTMLElement>) => {
        if (onChange) {
            onChange(event, value);
        }

        if (onClick) {
            onClick(event);
        }
    };

    return (
        <Element
            className={clsx(
                "quill-navigation-bottom-bar__action",
                `quill-navigation-bottom-bar__action-selected--${selected}`,
                className,
            )}
            onClick={handleChange}
            {...rest}
        >
            {(icon || activeIcon) && (
                <span className="quill-navigation-bottom-bar__action-icon">
                    {selected ? activeIcon : icon}
                </span>
            )}
            {showLabel && (
                <CaptionText color="quill-navigation-bottom-bar__action-label">
                    {label}
                </CaptionText>
            )}
            {children}
        </Element>
    );
};

export default BottomAction;
