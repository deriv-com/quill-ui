import React, { ReactNode } from "react";
import { TYPE } from "../../../utils/notification-utils";
import NotificationBanner from "../banner";

export interface NotificationBannersProps {
    className?: string;
    banners?: Array<{
        id: string;
        message?: ReactNode;
        title?: string;
        type: (typeof TYPE)[keyof typeof TYPE];
    }>;
    isMobile?: boolean;
}

const NotificationBanners = ({ banners = [] }: NotificationBannersProps) => {
    return banners.map((banner) => <NotificationBanner {...banner} />);
};

export default NotificationBanners;
