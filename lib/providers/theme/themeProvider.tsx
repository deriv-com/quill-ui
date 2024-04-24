import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Theme, ThemeContext } from "./themeContext";

export interface ThemeProviderProps {
    children: React.ReactNode;
    theme?: Theme;
}

export const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {
    const [selectedTheme, setSelectedTheme] = useState<Theme | undefined>(
        theme,
    );
    const [currentTheme, setCurrentTheme] = useState<Theme>(theme ?? "light");

    const systemPrefersDark = useMediaQuery("(prefers-color-scheme: dark)");

    const toggleTheme = () => {
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        setSelectedTheme(newTheme);
    };

    useEffect(() => {
        const theme = selectedTheme || (systemPrefersDark ? "dark" : "light");

        setCurrentTheme(theme);

        const link = document.createElement("link");
        link.rel = "stylesheet";

        if (theme === "light") {
            link.href = "/lib/styles/quill/light.scss";
        } else {
            link.href = "/lib/styles/quill/dark.scss";
        }

        document.head.appendChild(link);

        return () => {
            document.head.removeChild(link);
        };
    }, [selectedTheme, systemPrefersDark]);

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
            <section className={`theme--${currentTheme}`}>{children}</section>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
