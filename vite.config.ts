import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { globSync } from "glob";
import dts from "vite-plugin-dts";
import sass from "sass";

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
            fileName: (format) => `main.${format === "es" ? "mjs" : "cjs"}`,
            formats: ["es", "cjs"],
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes("node_modules")) {
                            return "vendor";
                        }
                    },
                },
            },
        },
        rollupOptions: {
            output: {
                entryFileNames: "[name].[format].js",
                chunkFileNames: "chunks/[name].[format].js",
                assetFileNames: "assets/[name][extname]",
            },
        },
    },
});
