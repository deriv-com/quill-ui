import React from "react";
import ReactDOM from "react-dom/client";
import { Text, Heading, ThemeProvider } from "../lib/main";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <Text as="span">Quill UI</Text>
            <Heading.Hero>Quill UI</Heading.Hero>
            <Heading.H1>Quill UI</Heading.H1>
            <Heading.H1 as="div">Quill UI - h1 as div</Heading.H1>
            <Heading.H1 as="span">Quill UI - h1 as span</Heading.H1>
        </ThemeProvider>
    </React.StrictMode>,
);
