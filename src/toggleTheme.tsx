import React from "react";
import UseTheme from "../lib/components/hooks/useTheme";
import "./index.scss";
import { H1 } from "../lib/components/Typography";

const ToggleTheme = () => {
    const { theme, toggleTheme } = UseTheme();
    return (
        <>
            <H1>This is {theme} theme</H1>
            <button
                className={`btn ${theme === "dark" ? "btn-dark" : "btn-light"}`}
                onClick={toggleTheme}
            >
                Click to toggle button
            </button>
        </>
    );
};

export default ToggleTheme;
