import React from "react";
import ReactDOM from "react-dom/client";
import { BodyText, H1, Hero, Typography } from "../lib/components/Typography";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Typography as="span">Quill UI</Typography>
        <Hero>Quill UI</Hero>
        <H1>Quill UI</H1>
        <H1 as="div">Quill UI - h1 as div</H1>
        <H1 as="span">Quill UI - h1 as span</H1>
    </React.StrictMode>,
);
