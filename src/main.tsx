import React from "react";
import ReactDOM from "react-dom/client";
import { Text, Heading, ThemeProvider } from "../lib/main";
import Button from "./button";
import ActionSheetExample from "../lib/components/action-sheet/mocks/example";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <div className="quill__background--primary__type--base">
                <Button />
                <Text as="span">Quill UI</Text>
                <Heading.Hero>Quill UI</Heading.Hero>
                <Heading.H1>Quill UI</Heading.H1>
                <Heading.H1 as="div">Quill UI - h1 as div</Heading.H1>
                <Heading.H1 as="span">Quill UI - h1 as span</Heading.H1>
                <ActionSheetExample />
            </div>
        </ThemeProvider>
    </React.StrictMode>,
);
