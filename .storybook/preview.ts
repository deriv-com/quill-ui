import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "./styles.scss";
import "../lib/styles/quill/static.scss";

const preview: Preview = {
    parameters: {
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
