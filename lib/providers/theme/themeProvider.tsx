import { useEffect, useState, PropsWithChildren } from "react";
import { ThemeContext, initialThemeState } from "./themeContext";
import { Theme } from "./themeContext";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const savedThemeLocal = window?.localStorage.getItem(
        "globalTheme",
    ) as Theme;
    const [theme, setTheme] = useState<Theme>(
        savedThemeLocal ?? initialThemeState.theme,
    );

    const applyThemeClass = (newTheme: Theme) => {
        document.body.classList.remove(`theme--${theme}`);
        document.body.classList.add(`theme--${newTheme}`);
    };

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        applyThemeClass(newTheme);
    };

    useEffect(() => {
        if (!document.body.classList.contains(`theme--${theme}`)) {
            applyThemeClass(theme);
        }
        window?.localStorage.setItem("globalTheme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
