import React from "react";

export type Theme = "dark" | "light";

export type ThemeContextValue = {
    theme: Theme;
    toggleTheme: () => void;
};

export const ThemeContext = React.createContext<ThemeContextValue>({
    theme: "light",
    toggleTheme: () => {},
});

export default ThemeContext;
