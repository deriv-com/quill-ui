import React, { useState } from "react";
import { ThemeProvider } from "../../../lib/main";

type ThemeRendererPros = {
    children: React.ReactNode;
};

type Theme = "dark" | "light";

const ThemeRenderer = ({ children }: ThemeRendererPros) => {
    const [theme] = useState<Theme>("light");

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeRenderer;
