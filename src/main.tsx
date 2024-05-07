import React from "react";
import ReactDOM from "react-dom/client";
import { Button, Heading, ThemeProvider } from "../lib/main";
import ThemeSwitcher from "./theme-switcher";
import DropdownList from "@components/Atom/dropdown/list";
import { Listbox } from "@headlessui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider>
            <div className="quill__background--primary__type--base">
                <ThemeSwitcher />
                <Heading.Hero>Quill UI</Heading.Hero>
                <Heading.H1>Quill UI</Heading.H1>
                <Heading.H1 as="div">Quill UI - h1 as div</Heading.H1>
                <Heading.H1 as="span">Quill UI - h1 as span</Heading.H1>
                <Listbox>
                    <Listbox.Button as="div">
                        <Button>Testing</Button>
                    </Listbox.Button>
                    <DropdownList
                        type="listbox"
                        defaultOption={{
                            value: "",
                            label: "Dropdown Chip Single Select",
                        }}
                        options={[
                            { value: "1", label: "Sample Item 1" },
                            { value: "2", label: "Sample Item 2" },
                            {
                                value: "3",
                                label: "Sample Item 3 - which is disabled",
                                disabled: true,
                            },
                            { value: "4", label: "Sample Item 4" },
                        ]}
                    />
                </Listbox>
            </div>
        </ThemeProvider>
    </React.StrictMode>,
);
