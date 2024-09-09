import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import postcss from "postcss";
import customProperties from "postcss-custom-properties";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Token Categories
const genericTokens = [
    "borderRadius",
    "size",
    "-color",
    "lineHeight",
    "fontSize",
    "paragraphSpacing",
    "typography",
    "opacity",
    "spacing",
    "fontFamily",
    "fontWeight",
    "fontDecoration",
    "motion",
    "borderWidth",
    "opacity",
    "borderRadius",
];
const componentTokens = [
    "button",
    "segmentedControl",
    "textIcon",
    "handle",
    "selectionControl",
    "tab",
    "field",
    "toggle",
    "modal",
    "pagination",
    "actionSheet",
    "snackbar",
    "badge",
    "fieldMarker",
    "dropdownItem",
    "dropdownList",
    "tag",
    "chip",
    "notification",
    "breadcrumb",
    "link",
    "tooltip",
    "accordion",
    "sectionMessage",
];

async function getAllPackageVersions(packageName) {
    try {
        const response = await fetch(
            `https://registry.npmjs.org/${packageName}`,
        );
        const data = await response.json();
        return Object.keys(data.versions);
    } catch (error) {
        console.error(`Failed to fetch versions for ${packageName}:`, error);
        return [];
    }
}

async function fetchCSS(packageName, version, filePath) {
    const url = `https://unpkg.com/${packageName}@${version}/${filePath}`;
    console.log(`Fetching CSS from: ${url}`);

    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(
                `Network response was not ok: ${response.statusText}`,
            );

        const cssText = await response.text();
        return cssText;
    } catch (error) {
        console.error(`Failed to fetch CSS: ${error}`);
        return null;
    }
}

async function parseCSSContent(cssText) {
    const cssVariables = {};
    const variableCounts = { generic: {}, component: {} };

    function cleanValue(value) {
        return value
            .replace(/\s+/g, " ") // Replace multiple spaces and newlines with a single space
            .trim(); // Remove leading and trailing whitespace
    }

    try {
        const result = await postcss([customProperties()]).process(cssText, {
            from: undefined,
        });

        result.root.walkRules((rule) => {
            rule.walkDecls((declaration) => {
                if (declaration.prop.startsWith("--")) {
                    const variableName = declaration.prop;
                    const rawValue = declaration.value;
                    const cleanedValue = cleanValue(rawValue);
                    cssVariables[variableName] = cleanedValue;

                    // Categorize the variable and count occurrences
                    let categorized = false;

                    for (const token of genericTokens) {
                        if (variableName.includes(token)) {
                            if (!variableCounts.generic[token]) {
                                variableCounts.generic[token] = 0;
                            }
                            variableCounts.generic[token]++;
                            categorized = true;
                            break;
                        }
                    }

                    if (!categorized) {
                        for (const token of componentTokens) {
                            if (variableName.includes(token)) {
                                if (!variableCounts.component[token]) {
                                    variableCounts.component[token] = 0;
                                }
                                variableCounts.component[token]++;
                                break;
                            }
                        }
                    }
                }
            });
        });
    } catch (error) {
        console.error("Failed to parse CSS:", error);
    }

    return { cssVariables, variableCounts };
}

// Function to save data as JSON
function saveJSON(data, version) {
    const directory = path.join(__dirname, "token-data");
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    const filePath = path.join(directory, `data-${version}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    console.log(`Data saved to ${filePath}`);
}

// Function to save versions list
function saveVersionsList(versionsWithData) {
    const filePath = path.join(__dirname, "token-data", "versions.json");
    fs.writeFileSync(
        filePath,
        JSON.stringify(versionsWithData, null, 2),
        "utf8",
    );
    console.log(`Versions list saved to ${filePath}`);
}

// Function to sort versions in descending order
function sortVersionsDescending(versions) {
    return versions.sort((v1, v2) => {
        const [major1, minor1, patch1] = v1.split(".").map(Number);
        const [major2, minor2, patch2] = v2.split(".").map(Number);

        if (major1 !== major2) return major2 - major1; // Descending order
        if (minor1 !== minor2) return minor2 - minor1;
        return patch2 - patch1;
    });
}

// Main function to process CSS and save JSON for all versions
async function processAllVersions(packageName, filePath) {
    const versions = await getAllPackageVersions(packageName);
    if (versions.length === 0) {
        console.log(`No versions found for ${packageName}.`);
        return;
    }

    const sortedVersions = sortVersionsDescending(versions);
    const versionsWithData = [];

    for (const version of sortedVersions) {
        console.log(`Processing version ${version}...`);
        const cssText = await fetchCSS(packageName, version, filePath);
        if (cssText) {
            const { cssVariables, variableCounts } =
                await parseCSSContent(cssText);
            if (Object.keys(cssVariables).length > 0) {
                // Only consider versions with data
                const data = {
                    cssVariables,
                    variableCounts,
                };
                saveJSON(data, version);
                versionsWithData.push(version);
            }
        }
    }

    saveVersionsList(versionsWithData);
}

processAllVersions("@deriv-com/quill-tokens", "dist/quill.css");
