import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { glob } from "glob";
import { extname, relative, resolve } from "path";
import { fileURLToPath } from "node:url";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import sass from "sass";


export default defineConfig(({ mode }) => {
    const plugins = [
        react(),
        dts({
            include: ["lib"],
            exclude: [
                "lib/**/*.spec.tsx",
                "lib/**/*.test.tsx",
                "lib/**/*.stories.tsx",
            ],
        }),
    ];

    if (mode === "es") {
        plugins.push(libInjectCss());
    }


    const buildOptions = {
        outDir: mode === "es" ? "dist-es" : "dist-cjs",
        lib: {
            entry: resolve(__dirname, "lib/main.ts"),
            // fileName: (format) => `main.${format === "es" ? "js" : "cjs"}`,
            formats: ["es", "cjs"],
        },
        rollupOptions: {},
    };

    buildOptions.rollupOptions =
        mode === "es"
            ? {
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
                  },
              }
            : {
                  output: {
                      entryFileNames: "[name].cjs",
                      chunkFileNames: "chunks/[name].cjs",
                      assetFileNames: "assets/[name][extname]",
                  },
              };

    return {
        plugins,
        css:
            mode === "es"
                ? {
                      preprocessorOptions: {
                          scss: {
                              implementation: sass,
                          },
                      },
                  }
                : {},
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
        build: buildOptions,
    };
});

