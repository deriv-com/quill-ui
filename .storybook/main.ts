import { withoutVitePlugins } from "@storybook/builder-vite";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../lib/**/*.mdx", "../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions",
        "@storybook/addon-themes",
        "@storybook/addon-mdx-gfm",
    ],

    framework: {
        name: "@storybook/react-vite",
        options: {},
    },

    docs: {
        defaultName: "Playground"
    },

    async viteFinal(config) {
        return {
            ...config,
            plugins: await withoutVitePlugins(config.plugins, [
                "vite:lib-inject-css",
            ]),
        };
    },

    typescript: {
        reactDocgen: "react-docgen-typescript"
    }
};
export default config;
