import React from "react";

export type Theme = "dark" | "light";

export const initialThemeState = {
    theme: "light" as Theme,
    toggleTheme: (() => null) as () => void,
};

export const ThemeContext = React.createContext(initialThemeState);
