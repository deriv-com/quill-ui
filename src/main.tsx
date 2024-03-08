import React from "react";
import ReactDOM from "react-dom/client";
import { Typography, H1, Hero } from "../dist/components/Typography";
import { ThemeProvider } from "../lib/components/providers/theme/themeProvider";
import ToggleTheme from "./toggleTheme";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <ToggleTheme />
            <Typography as="span">Quill UI</Typography>
            <Hero>Quill UI</Hero>
            <H1>Quill UI</H1>
            <H1 as="div">Quill UI - h1 as div</H1>
            <H1 as="span">Quill UI - h1 as span</H1>
        </ThemeProvider>
    </React.StrictMode>,
);
