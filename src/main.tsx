import React from "react";
import ReactDOM from "react-dom/client";
import ThemeRenderer from "./theme-renderer";
import BreakpointProvider from "@providers/breakpoint/breakpointProvider";
import Vault from "./vault";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeRenderer>
            <BreakpointProvider>
                <Vault />
            </BreakpointProvider>
        </ThemeRenderer>
    </React.StrictMode>,
);
