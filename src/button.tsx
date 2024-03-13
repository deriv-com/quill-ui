import React from "react";
import { UseTheme } from "../lib/main";

const Button = () => {
    const { toggleTheme } = UseTheme();

    return <button onClick={toggleTheme}>Toggle Theme</button>;
};

export default Button;
