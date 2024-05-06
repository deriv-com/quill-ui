import React from "react";
import { UseTheme, Button } from "../lib/main";

const ThemeSwitcher = () => {
    const { toggleTheme } = UseTheme();

    return (
        <div>
            <Button
                size="md"
                variant="primary"
                onClick={() => toggleTheme()}
                label="Toggle Theme"
            ></Button>
            <Button
                size="md"
                variant="primary"
                onClick={() => toggleTheme("light")}
                label="Switch to Light"
            ></Button>
            <Button
                size="md"
                variant="primary"
                onClick={() => toggleTheme("dark")}
                label="Switch to Dark"
            ></Button>
        </div>
    );
};

export default ThemeSwitcher;
