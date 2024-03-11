import { useContext } from "react";
import { ThemeContext } from "../providers/theme/themeContext";

export const UseTheme = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return { theme, toggleTheme };
};

export default UseTheme;
