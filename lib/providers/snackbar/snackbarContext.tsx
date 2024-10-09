import { SnackbarProps } from "@components/Snackbar/snackbar";
import { createContext } from "react";

export type SnackbarContextValue = {
    queue: SnackbarProps[];
    addSnackbar: (props: Omit<SnackbarProps, "id" | "isVisible">) => void;
    removeSnackbar: (id: string, onSnackbarRemove?: () => void) => void;
};

export const SnackbarContext = createContext<SnackbarContextValue>({
    queue: [],
    addSnackbar: () => {},
    removeSnackbar: () => {},
});
