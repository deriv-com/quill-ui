import React from "react";
import ReactDOM from "react-dom/client";
import { Typography } from "../lib/components/Typography/base";
import Heading from "../lib/components/Typography/heading";
import BodyText from "../lib/components/Typography/body-text";
import CaptionText from "../lib/components/Typography/caption";
import CodeText from "../lib/components/Typography/code";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Typography as="span">Quill UI</Typography>
        <Heading.Hero>Quill UI</Heading.Hero>
        <Heading.H1 size="xl">Quill UI</Heading.H1>
        <Heading.H1 as="div">Quill UI - h1 as div</Heading.H1>
        <Heading.H1 as="span">Quill UI - h1 as span</Heading.H1>
        <Heading.H2>Quill UI - h2</Heading.H2>
        <Heading.H3>Quill UI - h3</Heading.H3>
        <Heading.H4>Quill UI - h4</Heading.H4>
        <Heading.H5>Quill UI - h5</Heading.H5>
        <Heading.H6>Quill UI - h6</Heading.H6>
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
        <CaptionText italic>XL - Italic</CaptionText>
        <CodeText size="xl">Code Text - xl</CodeText>
        <CodeText size="lg">Code Text - lg</CodeText>
        <CodeText>Code Text - md</CodeText>
        <CodeText size="sm">Code Text - sm</CodeText>
    </React.StrictMode>,
);
