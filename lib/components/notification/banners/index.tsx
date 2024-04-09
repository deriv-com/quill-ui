import React, { ReactNode, useEffect, useRef, useState } from "react";
import { TYPE } from "../../../utils/notification-utils";
import NotificationBanner from "../banner";

export interface NotificationBannersProps {
    className?: string;
    banners?: Array<{
        message?: ReactNode;
        title?: string;
        type: (typeof TYPE)[keyof typeof TYPE];
    }>;
    isMobile?: boolean;
    onClose?: (closedBannerIdx: number) => void;
}

const NotificationBanners = ({
    banners = [],
    isMobile,
    onClose,
}: NotificationBannersProps) => {
    const [visibleBannerIdx, setVisibleBannerIdx] = useState(0);
    const intervalId = useRef<ReturnType<typeof setInterval>>();

    useEffect(() => {
        if (banners.length > 0) {
            runInterval();
        }
        return () => {
            if (intervalId.current) clearInterval(intervalId.current);
        };
    }, []);

    const runInterval = () => {
        clearInterval(intervalId.current);
        const id = setInterval(() => {
            // hide the current banner
            setVisibleBannerIdx((idx) => {
                const nextId = idx + 1;
                if (nextId > banners.length - 1) {
                    clearInterval(id);
                    return idx;
                }
                return nextId;
            });
        }, 4000);
        intervalId.current = id;
    };

    const handleClose = () => {
        const nextId = visibleBannerIdx + 1;
        if (nextId > banners.length - 1) {
            return;
        }
        // hide the current banner
        setVisibleBannerIdx(nextId);
        runInterval();
        onClose?.(visibleBannerIdx);
    };

    if (!banners.length) return null;
    return (
        <NotificationBanner
            {...banners[visibleBannerIdx]}
            isMobile={isMobile}
            onClose={handleClose}
        />
    );
};

export default NotificationBanners;
