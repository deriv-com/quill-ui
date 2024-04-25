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
        const unusedTheme = currentTheme === "dark" ? "light" : "dark";
        const root = document.documentElement;
        root.classList.add(currentTheme);
        root.classList.remove(unusedTheme);

        setCurrentTheme(theme);
    }, [selectedTheme, systemPrefersDark]);

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
