import React from "react";
import ReactDOM from "react-dom/client";
import { Text, Heading, ThemeProvider } from "../lib/main";
import Button from "./button";
import DropdownChipSingleSelect from "@components/Chip/dropdown-chip-single-select";

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
                <DropdownChipSingleSelect
                    onSelectionChange={() => console.log("123")}
                    options={[
                        { value: "1", label: "Sample Item 1" },
                        {
                            value: "2",
                            label: "Sample Item 2 - which is disabled",
                            disabled: true,
                        },
                        { value: "3", label: "Sample Item 3" },
                        { value: "4", label: "Sample Item 4" },
                    ]}
                    defaultOption={{ value: "", label: "dropdowns" }}
                />
            </div>
        </ThemeProvider>
    </React.StrictMode>,
);
