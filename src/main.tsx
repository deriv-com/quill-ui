import React from "react";
import ReactDOM from "react-dom/client";
import { Heading, Skeleton } from "../lib/main";
import ThemeSwitcher from "./theme-switcher";
import ThemeRenderer from "./theme-renderer";
import BreakpointProvider from "@providers/breakpoint/breakpointProvider";
import Breakpoint from "./breakpoint";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeRenderer>
            <BreakpointProvider>
                <div className="quill__background--primary__type--base">
                    <ThemeSwitcher />
                    <Heading.Hero>Quill UI</Heading.Hero>
                    <Heading.H1>Quill UI</Heading.H1>
                    <Heading.H1 as="div">Quill UI - h1 as div</Heading.H1>
                    <Heading.H1 as="span">Quill UI - h1 as span</Heading.H1>
                    <Breakpoint />
                    <Skeleton.Container direction="row">
                        <Skeleton.Container direction="column">
                            <Skeleton.Circle />
                            <Skeleton.Container direction="row">
                                <Skeleton.Square height={20} />
                                <Skeleton.Square height={20} />
                            </Skeleton.Container>
                        </Skeleton.Container>
                        <Skeleton.Container direction="row">
                            <Skeleton.Square height={50} />
                            <Skeleton.Square />
                            <Skeleton.Square />
                        </Skeleton.Container>
                    </Skeleton.Container>
                </div>
            </BreakpointProvider>
        </ThemeRenderer>
    </React.StrictMode>,
);
