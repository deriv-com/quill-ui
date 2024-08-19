import React from "react";
import ReactDOM from "react-dom/client";
import ThemeRenderer from "./vault/layout/theme-renderer";
import BreakpointProvider from "@providers/breakpoint/breakpointProvider";
import { BrowserRouter } from "react-router-dom";
import Vault from "./vault";
import "./vault/assets/styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeRenderer>
                <BreakpointProvider>
                    <Vault />
                </BreakpointProvider>
            </ThemeRenderer>
        </BrowserRouter>
    </React.StrictMode>,
);
