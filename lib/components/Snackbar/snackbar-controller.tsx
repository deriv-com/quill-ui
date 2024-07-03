import React from "react";
import { Snackbar, SnackbarProps } from "@components/Snackbar/snackbar";
import { useSnackbar } from "@hooks/useSnackbar";
import "./snackbar-controller.scss";

export const SnackbarController = () => {
    const { queue } = useSnackbar();
    return (
        <div className="snackbar--container">
            {queue.slice(0, 1).map((item: SnackbarProps) => {
                return (
                    <Snackbar
                        id={item.id}
                        isVisible={item.isVisible}
                        message={item.message}
                        actionText={item.actionText}
                        hasCloseButton={item.hasCloseButton}
                        key={item.id}
                        icon={item.icon}
                        onActionClick={item.onActionClick}
                    />
                );
            })}
        </div>
    );
};
