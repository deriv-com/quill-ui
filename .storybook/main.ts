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
    ],
    core: {
        builder: "@storybook/builder-vite",
    },
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    docs: {
        autodocs: "tag",
        defaultName: "Playground",
    },

    async viteFinal(config) {
        return {
            ...config,
            plugins: await withoutVitePlugins(config.plugins, [
                "vite:lib-inject-css",
            ]),
        };
    },
};
export default config;
