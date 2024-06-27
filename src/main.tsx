import React from "react";
import ReactDOM from "react-dom/client";
import { DropdownItem, Heading } from "../lib/main";
import ThemeSwitcher from "./theme-switcher";
import ThemeRenderer from "./theme-renderer";
import TestingDropdown from "./testing-dropdown";
import { LabelPairedAndroidSmIcon } from "@deriv/quill-icons";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeRenderer>
            <div className="quill__background--primary__type--base">
                <ThemeSwitcher />
                <Heading.Hero>Quill UI</Heading.Hero>
                <Heading.H1>Quill UI</Heading.H1>
                <Heading.H1 as="div">Quill UI - h1 as div</Heading.H1>
                <Heading.H1 as="span">Quill UI - h1 as span</Heading.H1>
                <TestingDropdown />
                <DropdownItem
                    // leftIcon={<LabelPairedAndroidSmIcon />}
                    rightIcon={<LabelPairedAndroidSmIcon />}
                    label="testing"
                    centered
                />
            </div>
        </ThemeRenderer>
    </React.StrictMode>,
);
