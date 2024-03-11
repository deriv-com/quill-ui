import React, { type Dispatch, type SetStateAction } from "react";

export type Theme = "dark" | "light";

export const initialThemeState = {
    theme: "light" as Theme,
    setTheme: (() => null) as Dispatch<SetStateAction<Theme>>,
    toggleTheme: (() => null) as () => void,
};

export const ThemeContext = React.createContext(initialThemeState);
