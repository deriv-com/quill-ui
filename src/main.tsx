import React from "react";
import ReactDOM from "react-dom/client";
import { Heading } from "../lib/main";
import ThemeSwitcher from "./theme-switcher";
import ThemeRenderer from "./theme-renderer";
import DropdownChipMultiSelect from "@components/Chip/dropdown-chip-multi-select";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeRenderer>
            <div className="quill__background--primary__type--base">
                <ThemeSwitcher />
                <Heading.Hero>Quill UI</Heading.Hero>
                <Heading.H1>Quill UI</Heading.H1>
                <Heading.H1 as="div">Quill UI - h1 as div</Heading.H1>
                <Heading.H1 as="span">Quill UI - h1 as span</Heading.H1>
                <DropdownChipMultiSelect
                    label="Testing"
                    onSelectionChange={(value) => {
                        console.log(value);
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
            </div>
        </ThemeRenderer>
    </React.StrictMode>,
);
