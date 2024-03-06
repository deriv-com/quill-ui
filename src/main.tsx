import React from "react";
import ReactDOM from "react-dom/client";
import {
    BodyText,
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    Hero,
    Typography,
} from "../lib/components/Typography";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Typography as="span">Quill UI</Typography>
        <Hero>Quill UI</Hero>
        <H1 size="xl">Quill UI</H1>
        <H1 as="div">Quill UI - h1 as div</H1>
        <H1 as="span">Quill UI - h1 as span</H1>
        <H2>Quill UI - h2</H2>
        <H3>Quill UI - h3</H3>
        <H4>Quill UI - h4</H4>
        <H5>Quill UI - h5</H5>
        <H6>Quill UI - h6</H6>
        <BodyText size="xl">XL</BodyText>
        <BodyText size="lg">XL</BodyText>
        <BodyText size="md">XL</BodyText>
        <BodyText size="sm">XL</BodyText>
        <br />
        <BodyText size="xl" bold>
            XL - bold
        </BodyText>
        <br />
        <BodyText size="xl" italic>
            XL - Italic
        </BodyText>
    </React.StrictMode>,
);
