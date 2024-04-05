import React from "react";
import ReactDOM from "react-dom/client";
import { SnackbarWrapper } from "../lib/components/Snackbar/SnackbarWrapper";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <div className="quill__background--primary__type--base">
            <SnackbarWrapper />
        </div>
    </React.StrictMode>,
);
