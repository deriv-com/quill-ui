import { createContext } from "react";

export type Theme = "dark" | "light";

export type ThemeContextValue = {
    theme: Theme;
    toggleTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
    theme: "light",
    toggleTheme: () => {},
});

export default ThemeContext;
