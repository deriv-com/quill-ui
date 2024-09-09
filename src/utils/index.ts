import { TypeData } from "src/vault/types";

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

export const unslugify = (text: string) => {
    return text
        .split("-") // Split the text by hyphens
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(" "); // Join the words with spaces
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

export const hexToRgba = (hex: string): string => {
    hex = hex.replace(/^#/, "");
    let alpha = 1.0;

    if (hex.length === 8) {
        alpha = parseInt(hex.slice(-2), 16) / 255;
        hex = hex.slice(0, 6);
    } else if (hex.length === 6) {
        // No alpha value in HEX string
    } else {
        throw new Error("Invalid HEX color");
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const rgbaToHex = (rgba: string): string => {
    const match = rgba.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*\.?\d*)?\)/,
    );

    if (!match) {
        throw new Error("Invalid RGBA color");
    }

    const r = parseInt(match[1]).toString(16).padStart(2, "0");
    const g = parseInt(match[2]).toString(16).padStart(2, "0");
    const b = parseInt(match[3]).toString(16).padStart(2, "0");

    const a = match[4]
        ? Math.round(parseFloat(match[4]) * 255)
              .toString(16)
              .padStart(2, "0")
        : "";

    return `#${r}${g}${b}${a}`;
};

export const limitTextWithEllipsis = (
    text: string,
    maxLength: number,
): string => {
    return text.length > maxLength
        ? `${text.slice(0, maxLength - 3)}...`
        : text;
};
