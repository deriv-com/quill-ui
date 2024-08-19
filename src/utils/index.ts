// src/utils/loadVersionData.ts

export interface TypeData {
    cssVariables: { [key: string]: string };
    variableCounts: { [key: string]: number };
}

export async function loadVersionData(
    version?: string,
): Promise<TypeData | null> {
    // Skip if no version is passed
    if (!version) {
        return null;
    }

    try {
        // Path to fetch JSON data
        const versionPath = `../../scripts/token-data/data-${version}.json`;

        // Fetch the JSON file
        const response = await fetch(versionPath);

        if (!response.ok) {
            throw new Error(
                `Network response was not ok: ${response.statusText}`,
            );
        }

        const data: TypeData = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to load data for version ${version}:`, error);
        return null;
    }
}

export const convertCamelToCapitalized = (str: string) => {
    return str
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camelCase words
        .replace(/^./, (match) => match.toUpperCase()); // Capitalize the first letter
};

export const cleanAndConvertCamelCase = (input: string) => {
    // Remove non-alphabet characters and split camelCase
    const cleaned = input
        .replace(/[^a-zA-Z]/g, "") // Remove non-alphabet characters
        .replace(/([a-z])([A-Z])/g, "$1 $2"); // Convert camelCase to space-separated words

    // Capitalize the first letter of each word
    return cleaned
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export const toCamelCase = (str: string): string => {
    return str
        .split(" ")
        .map((word, index) =>
            index === 0
                ? word.toLowerCase()
                : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join("");
};
