import React from "react";
import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "./styles.scss";
import BreakpointProvider from "../lib/providers/breakpoint/breakpointProvider";
import "@styles/static.scss";

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
