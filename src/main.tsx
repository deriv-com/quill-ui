import React from "react";
import ReactDOM from "react-dom/client";
import {
    CaptionText,
    CodeText,
    Heading,
    Text,
} from "../lib/components/Typography";
// import {
//     CaptionText,
//     CodeText,
//     Heading,
//     Text,
// } from "../dist/components/Typography";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Heading.Hero>Quill UI - Hero</Heading.Hero>
        <Heading.H1>Quill UI - H1</Heading.H1>
        <Heading.H2>Quill UI - H2</Heading.H2>
        <Heading.H3>Quill UI - H3</Heading.H3>
        <Heading.H4>Quill UI - H4</Heading.H4>
        <Heading.H5>Quill UI - H5</Heading.H5>
        <Heading.H6>Quill UI - H6</Heading.H6>

        <Text size="xl">TEXT - XL</Text>
        <br />
        <Text size="lg">TEXT - LG</Text>
        <br />
        <Text size="md">TEXT - MD</Text>
        <br />
        <Text size="sm">TEXT - SM</Text>
        <br />
        <Text size="xl" bold>
            XL - bold
        </Text>
        <br />
        <Text size="xl" italic>
            XL - Italic
        </Text>
        <CaptionText italic>XL - Italic</CaptionText>
        <CodeText size="xl">Code Text - xl</CodeText>
        <CodeText size="lg">Code Text - lg</CodeText>
        <CodeText>Code Text - md</CodeText>
        <CodeText size="sm">Code Text - sm</CodeText>
    </React.StrictMode>,
);
