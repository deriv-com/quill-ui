import { SnackbarProps } from "@components/Snackbar/snackbar";
import { createContext } from "react";

export type SnackbarContextValue = {
    queue: SnackbarProps[];
    addSnackbar: (props: Omit<SnackbarProps, "id" | "isVisible">) => void;
    removeSnackbar: (id?: string) => void;
};

export const SnackbarContext = createContext<SnackbarContextValue>({
    queue: [],
    addSnackbar: () => {},
    removeSnackbar: () => {},
});
