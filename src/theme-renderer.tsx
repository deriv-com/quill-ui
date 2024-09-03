import React, { useEffect, useState } from "react";
import { ThemeProvider } from "../lib/main";

type ThemeRendererPros = {
    children: React.ReactNode;
};

type Theme = "dark" | "light";

const ThemeRenderer = ({ children }: ThemeRendererPros) => {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        const timeout = setTimeout(() => {
            setTheme("light");
        }, 3000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <>
            <h1>Current theme: {theme}</h1>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </>
    );
};

export default ThemeRenderer;
