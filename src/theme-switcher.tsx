import React from "react";
import { UseTheme, Button } from "../lib/main";

const ThemeSwitcher = () => {
    const { toggleTheme } = UseTheme();

    return (
        <div>
            <Button
                size="md"
                variant="primary"
                onClick={toggleTheme}
                label="Toggle Theme"
            ></Button>
        </div>
    );
};

export default ThemeSwitcher;
