import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "../lib/main";
import { SnackbarWrapper } from "../lib/components/Snackbar/SnackbarWrapper";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <div className="quill__background--primary__type--base">
                <SnackbarWrapper />
            </div>
        </ThemeProvider>
    </React.StrictMode>,
);
