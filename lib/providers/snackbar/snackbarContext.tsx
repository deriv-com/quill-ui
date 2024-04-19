// SnackbarContext.js
import { Snackbar } from "@components/Snackbar";
import { ComponentProps, createContext } from "react";
import { SnackbarComponent } from "./snackbarProvider";

export type SnackbarContextValue = {
  queue:  SnackbarComponent[];
  addSnackbar: (props: ComponentProps<typeof Snackbar>) => void;
  removeSnackbar: () => void;
};

export const SnackbarContext = createContext<SnackbarContextValue>({ queue: [], addSnackbar: () => {}, removeSnackbar: () => {}, });