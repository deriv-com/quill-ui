import React from "react";
import "./notification.scss";
import { Text } from "../Typography";

export interface NotificationProps {
    className?: string;
    hasCloseButton?: boolean;
}

export const Notification = ({
    className,
    hasCloseButton,
}: NotificationProps) => {
    return (
        <div className={className}>
            <div className="body">
                <div className="icon">(i)</div>
                <div className="content">
                    <Text className="title">Title</Text>
                    <Text className="message">Message</Text>
                </div>
            </div>
            {hasCloseButton && <button className="close-button">x</button>}
        </div>
    );
};
