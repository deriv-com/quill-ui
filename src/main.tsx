import React from "react";
import ReactDOM from "react-dom/client";
import { H1, Hero, Typography } from "../lib/components/Typography";
import { ThemeProvider } from "../lib/components/providers/theme/themeProvider";
import "../lib/styles/quill.css";
import ToggleTheme from "./toggleTheme";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <div
                style={{
                    background:
                        "var(--semantic-color-background-primary-container",
                }}
            >
                <ToggleTheme />
                <Typography as="span">Quill UI</Typography>
                <Hero>Quill UI</Hero>
                <H1>Quill UI</H1>
                <H1 as="div">Quill UI - h1 as div</H1>
                <H1 as="span">Quill UI - h1 as span</H1>
            </div>
        </ThemeProvider>
    </React.StrictMode>,
);
