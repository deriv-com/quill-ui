import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Heading, SegmentedControlSingleChoice } from "../lib/main";
import ThemeSwitcher from "./theme-switcher";
import ThemeRenderer from "./theme-renderer";

const App = () => {
    const [tabs, setTabs] = useState([{ label: "test" }, { label: "tickles" }]);

    useEffect(() => {
        setTabs([{ label: "test" }, { label: "tickles" }, { label: "wow" }]);
    }, []);
    return (
        <ThemeRenderer>
            <div className="quill__background--primary__type--base">
                <ThemeSwitcher />
                <Heading.Hero>Quill UI</Heading.Hero>
                <Heading.H1>Quill UI</Heading.H1>
                <Heading.H1 as="div">Quill UI - h1 as div</Heading.H1>
                <Heading.H1 as="span">Quill UI - h1 as span</Heading.H1>
                <SegmentedControlSingleChoice options={tabs} />
            </div>
        </ThemeRenderer>
    );
};

const rootElement = document.getElementById("root") as HTMLElement;

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
}
