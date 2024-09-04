import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively read all CSS files in a directory
const readCssFiles = (dir) => {
    let cssFiles = [];
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            cssFiles = cssFiles.concat(readCssFiles(filePath));
        } else if (path.extname(file) === ".css") {
            cssFiles.push(filePath);
        }
    });

    return cssFiles;
};

// Function to extract variable names from var() functions in a CSS file
const extractVariablesFromCss = (cssFilePath) => {
    const fileContent = fs.readFileSync(cssFilePath, "utf8");
    const varPattern = /var\(\s*--([\w-]+)\s*\)/g;
    const variables = [];
    let match;

    while ((match = varPattern.exec(fileContent)) !== null) {
        variables.push(`--${match[1]}`);
    }

    return variables;
};

// Main function to get all variable names from CSS files in a directory
const getAllVariablesFromCssFiles = (dir) => {
    const cssFiles = readCssFiles(dir);
    const allVariables = [];

    cssFiles.forEach((filePath) => {
        const variables = extractVariablesFromCss(filePath);
        allVariables.push(...variables);
    });

    return [...new Set(allVariables)]; // Remove duplicates
};

// Specify the directory containing CSS files (e.g., 'dist/assets')
const cssDir = path.join(__dirname, "../dist/assets");
const variables = getAllVariablesFromCssFiles(cssDir);

// Output the result array
console.log(variables);

// Optionally, save the result array to a JSON file
const outputPath = path.join(__dirname, "../variables.json");
fs.writeFileSync(outputPath, JSON.stringify(variables, null, 2));

console.log(`Extracted variables to variables.json`);
