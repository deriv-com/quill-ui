import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "./styles.scss";
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
