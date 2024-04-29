import { TYPE } from "@utils/notification-utils";
import { Button, Text } from "..";
import { NotificationItemProps } from "./item";
import { StandaloneCirclePlusBoldIcon } from "@deriv/quill-icons";

interface NotificationTestButtonsProps {
    addNotification: (
        props:
            | Omit<NotificationItemProps, "id">
            | Omit<NotificationItemProps, "id" | "status">,
    ) => void;
    markAllAsRead?: () => void;
    removeAllNotifications?: () => void;
    shouldAddBanner?: boolean;
}

export const NotificationTestButtons = ({
    addNotification,
    markAllAsRead,
    removeAllNotifications,
    shouldAddBanner,
}: NotificationTestButtonsProps) => (
    <div
        style={{
            margin: shouldAddBanner ? "100px 20% 100px 80px" : "32px",
            width: "80%",
        }}
    >
        <Text>Testing button{shouldAddBanner ? "" : "s"}:</Text>
        <Button
            onClick={() => {
                addNotification({
                    icon: (
                        <StandaloneCirclePlusBoldIcon
                            fill="rgba(0, 130, 42, 1)"
                            iconSize="sm"
                        />
                    ),
                    message:
                        "This is a newly added notification with a custom icon.",
                    redirectTo: "https://www.example.com",
                    timestamp: shouldAddBanner
                        ? undefined
                        : new Date().getTime(),
                    title: "New notification",
                    type: TYPE.SUCCESS,
                });
            }}
        >
            Add new{" "}
            {shouldAddBanner ? "banner in the end" : "notification at the top"}
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
