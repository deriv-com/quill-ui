import React from "react";
import { UseTheme, Button } from "../lib/main";

const ThemeSwitcher = () => {
    const { toggleTheme } = UseTheme();

    return (
        <div>
            <Button variant="primary" onClick={toggleTheme}>
                Toggle Theme
            </Button>
        </div>
    );
};

export default ThemeSwitcher;
