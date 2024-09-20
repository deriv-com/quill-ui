import React from "react";
import {
    StandaloneCircleCheckBoldIcon,
    StandaloneCircleExclamationBoldIcon,
    StandaloneCircleInfoBoldIcon,
    StandaloneTriangleExclamationBoldIcon,
} from "@deriv/quill-icons";
import { TYPE } from "@utils/notification-utils";

interface NotificationIconProps {
    type?: (typeof TYPE)[keyof typeof TYPE];
}

const icons = {
    [TYPE.INFO]: {
        component: StandaloneCircleInfoBoldIcon,
        fillColor: "var(--component-textIcon-statusInverse-information)",
    },
    [TYPE.ERROR]: {
        component: StandaloneCircleExclamationBoldIcon,
        fillColor: "var(--component-textIcon-statusInverse-danger)",
    },
    [TYPE.SUCCESS]: {
        component: StandaloneCircleCheckBoldIcon,
        fillColor: "var(--component-textIcon-statusInverse-success)",
    },
    [TYPE.WARNING]: {
        component: StandaloneTriangleExclamationBoldIcon,
        fillColor: "var(--component-textIcon-statusInverse-warning)",
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
