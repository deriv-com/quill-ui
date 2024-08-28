import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { BreakpointProvider } from "../lib/providers/breakpoint/breakpointProvider";
import "./styles.scss";
import "@styles/static.scss";
import React from "react";

const preview: Preview = {
    tags: ["autodocs"],
    parameters: {
        docs: { source: { format: true } },
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        options: {
            storySort: {
                method: "alphabetical",
                order: ["Introduction", "Hooks", "Components"],
            },
        },
    },
    decorators: [
        (Story) => (
            <BreakpointProvider>
                <Story />
            </BreakpointProvider>
        ),
        withThemeByClassName({
            themes: {
                light: "light",
                dark: "dark",
            },
            parentSelector: "html",
            defaultTheme: "light",
        }),
    ],
};

export default preview;
