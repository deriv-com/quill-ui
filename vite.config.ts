import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, extname, relative } from "path";
import { fileURLToPath } from "url";
import { glob } from "glob";
import dts from "vite-plugin-dts";
import sass from "sass";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        dts({
            include: ["lib"],
            exclude: [
                "lib/**/*.spec.tsx",
                "lib/**/*.test.tsx",
                "lib/**/*.stories.tsx",
            ],
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                implementation: sass,
            },
        },
    },
    resolve: {
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
    },
    build: {
        lib: {
            entry: resolve(__dirname, "lib/main.ts"),
            formats: ["es", "cjs"], // Include both ES and CJS formats
            fileName: (format) => `main.${format === "es" ? "mjs" : "cjs"}`,
        },
        copyPublicDir: false,
        cssCodeSplit: false, // Ensure CSS is not split
        rollupOptions: {
            external: ["react", "react-dom"],
            input: Object.fromEntries(
                glob
                    .sync("lib/**/*.{ts,tsx}", {
                        ignore: [
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
                                    file.length - extname(file).length,
                                ),
                            ),
                            // The absolute path to the entry file
                            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
                            fileURLToPath(new URL(file, import.meta.url)),
                        ];
                    }),
            ),
            output: {
                assetFileNames: "assets/[name][extname]",
                entryFileNames: "[name].js",
                // Combine all CSS into one file
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return "vendor";
                    }
                },
            },
        },
    },
});
