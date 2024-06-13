import React from "react";
import ReactDOM from "react-dom/client";
import { Heading, SegmentedControlSingleChoice, TextArea } from "../lib/main";
import ThemeSwitcher from "./theme-switcher";
import ThemeRenderer from "./theme-renderer";
import { LabelPairedAndroidCaptionIcon } from "@deriv/quill-icons";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeRenderer>
            <div className="quill__background--primary__type--base">
                <ThemeSwitcher />
                <Heading.Hero>Quill UI</Heading.Hero>
                <Heading.H1>Quill UI</Heading.H1>
                <Heading.H1 as="div">Quill UI - h1 as div</Heading.H1>
                <Heading.H1 as="span">Quill UI - h1 as span</Heading.H1>
            </div>
            <div style={{ width: "400px" }}>
                <TextArea message="message here" textvalue="hello" />
            </div>
            <div style={{ width: "400px" }}>
                <TextArea message="message here" status="success" size="sm" />
            </div>
            <div style={{ width: "400px" }}>
                <TextArea
                    message="message here"
                    variant="fill"
                    status="success"
                    textvalue="hello"
                    disabled
                />
            </div>
        </ThemeRenderer>
        <SegmentedControlSingleChoice
            onChange={() => {}}
            options={[
                {
                    icon: <LabelPairedAndroidCaptionIcon />,
                },
                {
                    icon: <LabelPairedAndroidCaptionIcon />,
                },
                {
                    icon: <LabelPairedAndroidCaptionIcon />,
                },
                {
                    icon: <LabelPairedAndroidCaptionIcon />,
                },
                {
                    icon: <LabelPairedAndroidCaptionIcon />,
                },
            ]}
            selectedItemIndex={4}
            size="md"
        />
    </React.StrictMode>,
);
