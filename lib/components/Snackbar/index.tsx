import React from "react";
import { Snackbar, SnackbarProps } from "@components/Snackbar/Snackbar";
import { useSnackbar } from "@hooks/useSnackbar";
import "./snackbar.scss";

export const SnackbarController = () => {
    const { queue } = useSnackbar();
    return (
        <div className="snackbar--container">
            {queue.map((item: SnackbarProps, index) => {
                if (index === 0)
                    return (
                        <Snackbar
                            id={item.id}
                            isShown={item.isShown}
                            message={item.message}
                            actionText={item.actionText}
                            hasCloseButton={item.hasCloseButton}
                            key={item.id}
                            icon={item.icon}
                            onActionClick={item.onActionClick}
                        />
                    );
                return null;
            })}
        </div>
    );
}
