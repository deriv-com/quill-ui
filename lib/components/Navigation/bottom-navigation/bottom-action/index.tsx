import React from "react";
import { BottomBarProps } from "../bottom-bar";
import clsx from "clsx";
import { CaptionText } from "@components/Typography";
import Badge from "@components/Badge";

export interface BottomActionProps extends Omit<BottomBarProps, "showLabels"> {
    selected?: boolean;
    label?: string | React.ReactNode;
    showLabel?: boolean;
    icon: React.ReactNode;
    activeIcon: React.ReactNode;
    badge?: string;
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
        badge,
        ...rest
    } = props;

    const handleChange = (event: React.ChangeEvent<HTMLElement>) => {
        onChange?.(event, value);
        onClick?.(event);
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
            <Badge
                color="danger"
                label={badge}
                position="top-right"
                size="sm"
                variant="notification"
            >
                {(icon || activeIcon) && (
                    <span className="quill-navigation-bottom-bar__action-icon">
                        {selected ? activeIcon : icon}
                    </span>
                )}
            </Badge>
            {showLabel && (
                <CaptionText color="quill-navigation-bottom-bar__action-label">
                    {label}
                </CaptionText>
            )}

            {children}
        </Element>
    );
};

BottomAction.displayName = "Navigation.BottomAction";

export default BottomAction;
