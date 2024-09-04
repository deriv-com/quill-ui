import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively read all SCSS files in a directory
const readScssFiles = (dir) => {
    let scssFiles = [];
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            scssFiles = scssFiles.concat(readScssFiles(filePath));
        } else if (path.extname(file) === ".scss") {
            scssFiles.push(filePath);
        }
    });

    return scssFiles;
};

// Function to extract variable names from var() functions in a file
const extractVariablesFromVar = (filePath) => {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const varPattern = /var\(\s*--([\w-]+)\s*\)/g; // Matches var(--variable-name)
    const variables = [];
    let match;

    while ((match = varPattern.exec(fileContent)) !== null) {
        variables.push(`--${match[1]}`);
    }

    return variables;
};

// Function to get the top-level folder from a SCSS file path
const getTopLevelFolder = (filePath) => {
    const parts = filePath.split(path.sep);
    // Assuming top-level folders are directly under the 'components' directory
    const topLevelFolderIndex = parts.indexOf("components") + 1;
    return parts[topLevelFolderIndex] || "unknown";
};

// Main function to get all variable names from SCSS files in a directory, organized by top-level folder
const getAllVariablesByTopLevelFolder = (dir) => {
    const scssFiles = readScssFiles(dir);
    const componentVariables = {};

    scssFiles.forEach((filePath) => {
        // Get the top-level component name from the file path
        const topLevelFolder = getTopLevelFolder(filePath);
        const variables = extractVariablesFromVar(filePath);

        if (!componentVariables[topLevelFolder]) {
            componentVariables[topLevelFolder] = [];
        }

        componentVariables[topLevelFolder] = [
            ...new Set(componentVariables[topLevelFolder].concat(variables)),
        ];
    });

    return componentVariables;
};

// Specify the directory containing SCSS files (e.g., 'lib/components')
const scssDir = path.join(__dirname, "../lib/components");
const variablesByTopLevelFolder = getAllVariablesByTopLevelFolder(scssDir);

// Convert to the desired format: [{ ComponentName: [var1, var2, var3] }, ...]
const resultArray = Object.entries(variablesByTopLevelFolder).map(
    ([component, variables]) => {
        return { [component]: variables };
    },
);

// Output the result array
console.log(resultArray);

// Optionally, save the result array to a JSON file
const outputPath = path.join(__dirname, "../variables.json");
fs.writeFileSync(outputPath, JSON.stringify(resultArray, null, 2));

console.log(`Extracted variables to variables.json`);
