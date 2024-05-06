import React from "react";

export type Theme = "dark" | "light";

export type ThemeContextValue = {
    theme: Theme;
    toggleTheme: (e?: Theme) => void;
};

export const ThemeContext = React.createContext<ThemeContextValue>({
    theme: "light",
    toggleTheme: () => {},
});

export default ThemeContext;
