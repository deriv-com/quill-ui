import {
    StandaloneCircleCheckBoldIcon,
    StandaloneCircleExclamationBoldIcon,
    StandaloneCircleInfoBoldIcon,
    StandaloneTriangleExclamationBoldIcon,
} from "@deriv/quill-icons";
import React from "react";

interface NotificationIconProps {
    icon: string;
}

export const NotificationIcon = ({ icon }: NotificationIconProps) => {
    const icons = {
        info: { component: StandaloneCircleInfoBoldIcon, fillColor: "#1789E1" },
        failure: {
            component: StandaloneCircleExclamationBoldIcon,
            fillColor: "#DB0800",
        },
        success: {
            component: StandaloneCircleCheckBoldIcon,
            fillColor: "#00822A",
        },
        warning: {
            component: StandaloneTriangleExclamationBoldIcon,
            fillColor: "#E18D00",
        },
    };
    const IconComponent = icons[icon as keyof typeof icons]?.component;

    if (!IconComponent) return null;
    return (
        <IconComponent
            fill={icons[icon as keyof typeof icons].fillColor}
            iconSize="sm"
        />
    );
};
