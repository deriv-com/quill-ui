import React from "react";
import ReactDOM from "react-dom/client";
import ThemeRenderer from "./vault/layout/theme-renderer";
import BreakpointProvider from "@providers/breakpoint/breakpointProvider";
import { BrowserRouter } from "react-router-dom";
import Vault from "./vault";
import "./vault/assets/styles/main.scss";
import VersionProvider from "./vault/hooks/useVersion";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeRenderer>
                <BreakpointProvider>
                    <VersionProvider>
                        <Vault />
                    </VersionProvider>
                </BreakpointProvider>
            </ThemeRenderer>
        </BrowserRouter>
    </React.StrictMode>,
);
