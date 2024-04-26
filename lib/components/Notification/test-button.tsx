import { TYPE } from "@utils/notification-utils";
import { Button, Text } from "..";
import { NotificationItemProps } from "./item";

interface AddNewNotificationTestButtonsProps {
    addNotification: (
        props:
            | Omit<NotificationItemProps, "id">
            | Omit<NotificationItemProps, "id" | "status">,
    ) => void;
    markAllAsRead?: () => void;
    removeAllNotifications?: () => void;
    shouldAddBanner?: boolean;
}

export const AddNewNotificationTestButtons = ({
    addNotification,
    markAllAsRead,
    removeAllNotifications,
    shouldAddBanner,
}: AddNewNotificationTestButtonsProps) => (
    <div
        style={{
            margin: shouldAddBanner ? "30%" : "32px",
            width: "60%",
            height: "fit-content",
        }}
    >
        <Text>The below buttons are provided for testing purposes:</Text>
        <Button
            onClick={() => {
                addNotification({
                    message: "This is a new notification",
                    redirectTo: "https://www.example.com",
                    timestamp: shouldAddBanner
                        ? undefined
                        : new Date().getTime(),
                    title: "New notification",
                    type: TYPE.INFO,
                });
            }}
        >
            Add new notification
        </Button>
        {!shouldAddBanner && (
            <>
                <Button onClick={markAllAsRead}>Mark all as read</Button>
                <Button onClick={removeAllNotifications}>
                    Remove all notifications
                </Button>
            </>
        )}
    </div>
);
