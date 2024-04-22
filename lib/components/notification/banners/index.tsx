import React, { ReactNode } from "react";
import clsx from "clsx";
import { TYPE } from "../../../utils/notification-utils";
import NotificationBanner from "../banner";

export interface NotificationBannersProps {
    autohideTimeout?: number;
    className?: string;
    banners?: Array<{
        id: string;
        message?: ReactNode;
        title?: string;
        type: (typeof TYPE)[keyof typeof TYPE];
    }>;
    isMobile?: boolean;
    onClose?: (bannerId: string) => void;
    zIndex?: number;
}

const NotificationBanners = ({
    autohideTimeout,
    banners = [],
    className,
    isMobile,
    onClose,
    zIndex,
}: NotificationBannersProps) => {
    if (!banners.length) return null;
    return (
        <div
            className={clsx(
                `notification-banners${isMobile ? "__mobile" : ""}`,
                className,
            )}
            style={{ zIndex }}
        >
            {banners.slice(0, 1).map(({ id, ...rest }) => (
                <NotificationBanner
                    {...rest}
                    autohideTimeout={autohideTimeout}
                    key={id}
                    isMobile={isMobile}
                    onClose={() => onClose?.(id)}
                />
            ))}
        </div>
    );
};

export default NotificationBanners;
