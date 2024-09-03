import React, { useEffect, useState } from "react";
import { ThemeProvider } from "../lib/main";
import useTheme from "@hooks/useTheme";

type ThemeRendererPros = {
    children: React.ReactNode;
};

type Theme = "dark" | "light";

const ThemeRenderer = ({ children }: ThemeRendererPros) => {
    // const [theme, setTheme] = useState<Theme>("dark");
    const { theme } = useTheme();

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setTheme("light");
    //     }, 3000);

    //     return () => {
    //         clearTimeout(timeout);
    //     };
    // }, []);

    // const { theme } = useTheme();

    console.log(theme);

    return (
        <>
            {/* <h1>Current theme: {theme}</h1> */}
            <ThemeProvider>{children}</ThemeProvider>
        </>
    );
};

export default ThemeRenderer;
