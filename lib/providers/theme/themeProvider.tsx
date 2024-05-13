import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Theme, ThemeContext } from "./themeContext";

export interface ThemeProviderProps {
    children: React.ReactNode;
    theme?: Theme;
    persistent?: boolean;
}

export const ThemeProvider = ({
    children,
    theme,
    persistent,
}: ThemeProviderProps) => {
    const [selectedTheme, setSelectedTheme] = useState<Theme | undefined>(
        theme,
    );

    const [currentTheme, setCurrentTheme] = useState<Theme>(theme ?? "light");

    const themeClassNames = ["light", "dark"];

    const root =
        typeof document !== "undefined" ? document.documentElement : null;

    const systemPrefersDark = useMediaQuery("(prefers-color-scheme: dark)");

    const toggleTheme = (newTheme?: Theme) => {
        const selectedNewTheme =
            newTheme || (currentTheme === "dark" ? "light" : "dark");

        setSelectedTheme(selectedNewTheme);
    };

    const ApplyTheme = () => {
        const currentTheme =
            selectedTheme || (systemPrefersDark ? "dark" : "light");
        const unusedTheme = currentTheme === "dark" ? "light" : "dark";

        root?.classList.add(currentTheme);
        root?.classList.remove(unusedTheme);

        setCurrentTheme(currentTheme);
        setSelectedTheme(currentTheme);
    };

    useEffect(() => {
        ApplyTheme();
    }, [selectedTheme, systemPrefersDark]);

    useEffect(() => {
        setSelectedTheme(theme);
    }, [theme]);

    useEffect(() => {
        /* 
            If enabled, this feature allows for the continuous addition of a class name to the root element 
            to manage the theme. This can be particularly useful for consumers with extensive mutations 
            to the root document before it is fully loaded. 
        */
        if (persistent) {
            const observer = new MutationObserver((mutationsList) => {
                mutationsList.forEach((mutation) => {
                    if (
                        mutation.type === "attributes" &&
                        mutation.attributeName === "class"
                    ) {
                        if (
                            !themeClassNames.some((className) =>
                                root?.classList.contains(className),
                            )
                        ) {
                            ApplyTheme();
                        }
                    }
                });
            });

            if (root) {
                observer.observe(root, { attributes: true });
            }

            return () => {
                observer.disconnect();
            };
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
