import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import dts from "vite-plugin-dts";
import sass from "sass";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

    const config_resolve = {
        alias: {
            "@quill": resolve(__dirname, "lib/styles/quill"),
            "@quill-custom": resolve(__dirname, "lib/styles/custom"),
            "@components": resolve(__dirname, "lib/components"),
            "@hooks": resolve(__dirname, "lib/hooks"),
            "@providers": resolve(__dirname, "lib/providers"),
            "@utils": resolve(__dirname, "lib/utils"),
            "@styles": resolve(__dirname, "lib/styles"),
            "@types": resolve(__dirname, "lib/types.ts"),
        },
    };

    const dts_plugin = dts({
        include: ["lib"],
        exclude: [
            "**/mocks/**",
            "lib/**/*.spec.tsx",
            "lib/**/*.test.tsx",
            "lib/**/*.stories.tsx",
        ],
    });

    const css_preprocessor = {
        preprocessorOptions: {
            scss: {
                implementation: sass,
            },
        },
    };

    const config =
        mode === "es"
            ? {
                plugins: [
                    react(),
                    libInjectCss(),
                    dts_plugin
                ],
                css: css_preprocessor,
                resolve: config_resolve,
                build: {
                    outDir: "dist-es",
                    lib: {
                        entry: resolve(__dirname, "lib/main.ts"),
                        formats: ["es"],
                    },
                    copyPublicDir: false,
                    cssCodeSplit: false,
                    rollupOptions: {
                        external: ["react", "react-dom"],
                        input: Object.fromEntries(
                            glob
                                .sync("lib/**/*.{ts,tsx}", {
                                    ignore: [
                                        "**/mocks/**",
                                        "**/*.test.ts",
                                        "**/*.test.tsx",
                                        "**/*.spec.ts",
                                        "**/*.spec.tsx",
                                        "**/__tests__/**",
                                        "**/*.stories.tsx",
                                        "**/*.stories.ts",
                                    ],
                                })
                                .map((file) => {
                                    return [
                                        // The name of the entry point
                                        // lib/nested/foo.ts becomes nested/foo
                                        relative(
                                            "lib",
                                            file.slice(
                                                0,
                                                file.length -
                                                    extname(file).length,
                                            ),
                                        ),
                                        // The absolute path to the entry file
                                        // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
                                        fileURLToPath(
                                            new URL(file, import.meta.url),
                                        ),
                                    ];
                                }),
                        ),
                        output: {
                            assetFileNames: "assets/[name][extname]",
                            entryFileNames: "[name].js",
                        },
                    },
                },
            }
        :   {
                plugins: [
                    react(),
                    dts_plugin
                ],
                resolve: config_resolve,
                build: {
                    outDir: "dist-cjs",
                    lib: {
                        entry: resolve(__dirname, "lib/main.ts"),
                        formats: ["cjs"],
                    },
                    copyPublicDir: false,
                    cssCodeSplit: false,
                    rollupOptions: {
                        external: ["react", "react-dom"],
                        output: {
                            entryFileNames: "[name].cjs",
                            chunkFileNames: "chunks/[name].cjs",
                            assetFileNames: "assets/[name][extname]",
                        },
                    },
                },
            };

    return config;
});
