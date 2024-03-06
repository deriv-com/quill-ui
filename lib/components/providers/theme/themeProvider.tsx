import { useEffect, useState, PropsWithChildren } from "react";

import { ThemeContext, initialThemeState } from "./themeContext";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const savedThemeLocal = window?.localStorage.getItem("globalTheme");
    const [theme, setTheme] = useState(
        savedThemeLocal ?? initialThemeState.theme,
    );

    useEffect(() => {
        if (savedThemeLocal) {
            setTheme(savedThemeLocal);
        }
    }, []);

    useEffect(() => {
        window?.localStorage.setItem("globalTheme", theme);
        document.body.classList.add(`theme--${theme}`);
        document.body.style.backgroundColor =
            "var(--semantic-color-background-secondary-base)";
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
