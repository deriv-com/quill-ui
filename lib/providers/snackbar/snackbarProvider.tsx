import React, { useState, PropsWithChildren } from "react";
import { SnackbarContext } from "./snackbarContext";
import { SnackbarProps } from "@components/Snackbar/snackbar";
import { v4 as uuid } from 'uuid';

export interface SnackbarProviderProps {
    children: React.ReactNode;
}

export const SnackbarProvider = ({
    children,
}: PropsWithChildren<SnackbarProviderProps>) => {
    const [queue, setQueue] = useState<SnackbarProps[]>([]);

    const addSnackbar = (props: Omit<SnackbarProps, 'id' | 'isVisible'>) => {
        const modifiedSnackbar = {
            ...props,
            isVisible: true,
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
                    return { ...item, isVisible: false };
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
