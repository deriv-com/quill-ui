import React, { useState, PropsWithChildren } from "react";
import { SnackbarContext } from "./snackbarContext";
import { SnackbarProps } from "../../components/Snackbar/snackbar";
import uuid from 'react-uuid';

export interface SnackbarProviderProps {
    children: React.ReactNode;
}

export const SnackbarProvider = ({
    children,
}: PropsWithChildren<SnackbarProviderProps>) => {
    const [queue, setQueue] = useState<SnackbarProps[]>([]);

    const addSnackbar = (props: Omit<SnackbarProps, 'id' | 'isShown'>) => {
        const modifiedSnackbar = {
            ...props,
            isShown: true,
            id: uuid(),
        };
        setQueue((prev) => [...prev, { ...modifiedSnackbar }]);
    };

    const removeSnackbarFromQueue = (id: string) => {
        setQueue((prevQueue) => {
            const updatedQueue = prevQueue.filter((item) => item.id !== id);
            return updatedQueue;
        });
    };

    const removeSnackbar = (id: string) => {
        setQueue((prevQueue: SnackbarProps[]) => {
            return prevQueue.map((item, index) => {
                if (index === 0) {
                    setTimeout(() => {
                        removeSnackbarFromQueue(id);
                    }, 500);
                    return { ...item, isShown: false };
                }
                return item;
            });
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
