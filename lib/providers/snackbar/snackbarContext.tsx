// SnackbarContext.js
import { SnackbarProps } from "@components/Snackbar/Snackbar";
import { createContext } from "react";

export type SnackbarContextValue = {
  queue:  SnackbarProps[];
  addSnackbar: (props: Omit<SnackbarProps, 'id' | 'isShown'>) => void;
  removeSnackbar: (id: string) => void;
};

export const SnackbarContext = createContext<SnackbarContextValue>({ queue: [], addSnackbar: () => {}, removeSnackbar: () => {}, });