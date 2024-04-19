import { useContext } from "react";
import { SnackbarContext } from "../providers/snackbar/snackbarContext";

export const useSnackbar = () => {
    const { queue, addSnackbar, removeSnackbar } =
        useContext(SnackbarContext);
    return { queue, addSnackbar, removeSnackbar };
};
