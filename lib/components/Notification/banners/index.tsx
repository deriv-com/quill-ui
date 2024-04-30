import React from "react";
import clsx from "clsx";
import NotificationBanner from "../banner";
import type { NotificationBannerProps } from "../banner";

export interface NotificationBannersProps {
    autohideTimeout?: number;
    className?: string;
    banners?: Array<NotificationBannerProps & { id: string }>;
    isMobile?: boolean;
    onClick?: (bannerId: string) => void;
    onClose?: (bannerId: string) => void;
    zIndex?: number;
}

const NotificationBanners = ({
    autohideTimeout,
    banners = [],
    className,
    isMobile,
    onClick,
    onClose,
    zIndex,
}: NotificationBannersProps) => {
    if (!banners.length) return null;
    return (
        <div
            className={clsx(
                `notification__banners${isMobile ? "--mobile" : ""}`,
                className,
            )}
            style={{ zIndex }}
        >
            {banners.slice(0, 1).map(({ id, ...rest }) => (
                <NotificationBanner
                    {...rest}
                    autohideTimeout={autohideTimeout ?? 4000}
                    key={id}
                    isMobile={isMobile}
                    onClick={() => onClick?.(id)}
                    onClose={() => onClose?.(id)}
                />
            ))}
        </div>
    );
};

export default NotificationBanners;
