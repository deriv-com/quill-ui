import React, { ReactNode, useState, PropsWithChildren } from "react";
import { SnackbarContext } from "./snackbarContext";
import { SnackbarProps, Snackbar } from "../../components/Snackbar";

export interface SnackbarProviderProps {
    children: React.ReactNode;
}

export type SnackbarComponent = React.FC<typeof Snackbar> | ReactNode;

export const SnackbarProvider = ({
    children,
}: PropsWithChildren<SnackbarProviderProps>) => {
    const [queue, setQueue] = useState<SnackbarComponent[]>([]);

    const addSnackbar = (props: SnackbarProps) => {
        setQueue((prevQueue: SnackbarComponent[]) => [
            ...prevQueue,
            <Snackbar {...props} />,
        ]);
    };

    const removeSnackbar = () => {
        setQueue((prevQueue: SnackbarComponent[]) => {
            const [, ...newQueue] = prevQueue;
            return newQueue;
        });
    };

    return (
        <SnackbarContext.Provider
            value={{ queue, addSnackbar, removeSnackbar }}
        >
            {children}
        </SnackbarContext.Provider>
    );
};
