import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "../lib/main";
import { SnackbarProvider } from "../lib/providers/snackbar/snackbarProvider";
import { Something } from "./something";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <div className="quill__background--primary__type--base">
                <SnackbarProvider>
                    <Something />
                </SnackbarProvider>
            </div>
        </ThemeProvider>
    </React.StrictMode>,
);
