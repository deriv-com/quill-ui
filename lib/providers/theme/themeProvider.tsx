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

    const toggleTheme = (updatedTheme: Theme) => {
        setSelectedTheme(updatedTheme);
    };

    useEffect(() => {
        const theme = selectedTheme || (systemPrefersDark ? "dark" : "light");

        setCurrentTheme(theme);
    }, [selectedTheme, systemPrefersDark]);

    useEffect(() => {
        const root = document.documentElement;
        if (currentTheme === "dark") {
            root.classList.add("theme--dark");
        } else {
            root.classList.remove("theme--dark");
        }
    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
            <div className={`theme--${currentTheme}`}>{children}</div>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
