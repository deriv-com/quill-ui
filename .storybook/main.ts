import { withoutVitePlugins } from "@storybook/builder-vite";
import type { StorybookConfig } from "@storybook/react-vite";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
    stories: ["../lib/**/*.mdx", "../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

    addons: [
        "@storybook/addon-links",
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions",
        "@storybook/addon-themes",
        "@storybook/addon-essentials",
        {
            name: "@storybook/addon-docs",
            options: {
                mdxPluginOptions: {
                    mdxCompileOptions: {
                        remarkPlugins: [remarkGfm],
                    },
                },
            },
        },
    ],

    framework: {
        name: "@storybook/react-vite",
        options: {},
    },

    docs: {
        defaultName: "Playground",
    },

    async viteFinal(config) {
        return {
            ...config,
            plugins: await withoutVitePlugins(config.plugins, [
                "vite:lib-inject-css",
            ]),
            optimizeDeps: {
                exclude: ["node_modules/.cache/storybook"],
            },
        };
    },

    typescript: {
        reactDocgen: "react-docgen-typescript",
    },
};
export default config;
