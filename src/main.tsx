import React from "react";
import ReactDOM from "react-dom/client";
import { Heading, ThemeProvider, TextField } from "../lib/main";
import ThemeSwitcher from "./theme-switcher";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <div className="quill__background--primary__type--base">
                <ThemeSwitcher />
                <Heading.Hero>Quill UI</Heading.Hero>
                <Heading.H1>Quill UI</Heading.H1>
                <Heading.H1 as="div">Quill UI - h1 as div</Heading.H1>
                <Heading.H1 as="span">Quill UI - h1 as span</Heading.H1>
                <div style={{ width: "20rem" }}>
                    <TextField
                        type="tel"
                        variant="fill"
                        value="hello"
                        status="success"
                        label="hello"
                        maxLength={10}
                        message="message here message here message here message here message here message here"
                        characterCounter
                    />
                </div>
            </div>
        </ThemeProvider>
    </React.StrictMode>,
);
