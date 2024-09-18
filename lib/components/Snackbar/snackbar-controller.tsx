import React from "react";
import { Snackbar, SnackbarProps } from "@components/Snackbar/snackbar";
import { useSnackbar } from "@hooks/useSnackbar";
import { createPortal } from "react-dom";
import "./snackbar-controller.scss";

export const SnackbarController = () => {
    const { queue } = useSnackbar();

    return createPortal(
        <div className="snackbar--container">
            {queue.slice(0, 1).map((item: SnackbarProps) => {
                const { id, ...rest } = item;

                return (
                    <Snackbar id={id} key={id} standalone={false} {...rest} />
                );
            })}
        </div>,
        document.body,
    );
};
