import React from "react";
import {
    StandaloneCircleCheckBoldIcon,
    StandaloneCircleExclamationBoldIcon,
    StandaloneCircleInfoBoldIcon,
    StandaloneTriangleExclamationBoldIcon,
} from "@deriv/quill-icons";
import { TYPE } from "../../utils/notification-utils";

interface NotificationIconProps {
    type?: (typeof TYPE)[keyof typeof TYPE];
}

const icons = {
    [TYPE.INFO]: {
        component: StandaloneCircleInfoBoldIcon,
        fillColor: "#1789E1",
    },
    [TYPE.ERROR]: {
        component: StandaloneCircleExclamationBoldIcon,
        fillColor: "#DB0800",
    },
    [TYPE.SUCCESS]: {
        component: StandaloneCircleCheckBoldIcon,
        fillColor: "#00822A",
    },
    [TYPE.WARNING]: {
        component: StandaloneTriangleExclamationBoldIcon,
        fillColor: "#E18D00",
    },
};

export const NotificationIcon = ({ type }: NotificationIconProps) => {
    const IconComponent = icons[type as keyof typeof icons]?.component;

    if (!IconComponent) return null;
    return (
        <IconComponent
            fill={icons[type as keyof typeof icons].fillColor}
            iconSize="sm"
        />
    );
};
