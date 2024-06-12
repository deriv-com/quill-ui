import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function mergeDist() {
    const distPath = path.resolve(__dirname, "dist");
    const distEsPath = path.resolve(__dirname, "dist-es");
    const distCjsPath = path.resolve(__dirname, "dist-cjs");

    // Ensure the main dist directory is clean
    await fs.emptyDir(distPath);

    // Copy ES output to dist
    await fs.copy(distEsPath, distPath);

    // Copy CJS output to dist, preserving subdirectories and overwriting existing files
    await fs.copy(distCjsPath, distPath);

    // Optionally remove the separate dist-es and dist-cjs directories
    await fs.remove(distEsPath);
    await fs.remove(distCjsPath);

    console.log("Merged dist-es and dist-cjs into dist");
}

mergeDist().catch(console.error);
