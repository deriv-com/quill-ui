import { toCamelCase } from "../../utils";

type TokensObject = { [key: string]: string };

export interface ProcessedObject {
    key: string;
    value: string;
    tokens: TokensObject;
}

export interface Categories {
    core: ProcessedObject[];
    semantic: ProcessedObject[];
    component: ProcessedObject[];
    generic: ProcessedObject[];
}

export interface Colors {
    [key: string]: string;
}

export type PageList = Colors;

interface CategorizedColors {
    [colorName: string]: Colors;
}

export const categorizeVariables = (obj: {
    [key: string]: string;
}): Categories => {
    const categories: Categories = {
        core: [],
        semantic: [],
        component: [],
        generic: [],
    };

    const knownCategories: string[] = ["core", "semantic", "component"];

    const capitalize = (str: string): string =>
        str.charAt(0).toUpperCase() +
        str.slice(1).replace(/([a-z])([A-Z])/g, "$1 $2");

    Object.keys(obj).forEach((key) => {
        const cleanedKey = key.replace(/^--/, "");
        const parts = cleanedKey.split("-");
        const category = parts[0];
        const keyName = knownCategories.includes(category)
            ? parts[1]
            : parts[0];
        const tokenKey = capitalize(keyName);

        const targetCategory = knownCategories.includes(category)
            ? category
            : "generic";

        const existingObject = categories[targetCategory].find(
            (item) => item.key === toCamelCase(tokenKey),
        );

        if (existingObject) {
            existingObject.tokens[key] = obj[key];
        } else {
            const newProcessedObject: ProcessedObject = {
                key: toCamelCase(tokenKey),
                value: tokenKey,
                tokens: { [key]: obj[key] },
            };
            categories[targetCategory].push(newProcessedObject);
        }
    });

    return { ...categories };
};

export const categorizeSolidColors = (colors: Colors): CategorizedColors => {
    return Object.keys(colors).reduce<CategorizedColors>((acc, key) => {
        const match = key.match(/--core-color-solid-(\w+)-\d+/);
        if (match) {
            const colorName = match[1];
            if (!acc[colorName]) {
                acc[colorName] = {};
            }
            acc[colorName][key] = colors[key];
        }
        return acc;
    }, {});
};

export const categorizeOpacityColors = (colors: Colors): CategorizedColors => {
    return Object.keys(colors).reduce<CategorizedColors>((acc, key) => {
        const match = key.match(/--core-color-opacity-(\w+)-\d+/);
        if (match) {
            const colorName = match[1];
            if (!acc[colorName]) {
                acc[colorName] = {};
            }
            acc[colorName][key] = colors[key];
        }
        return acc;
    }, {});
};

export const categorizeGradientColors = (colors: Colors): CategorizedColors => {
    return Object.keys(colors).reduce<CategorizedColors>((acc, key) => {
        const match = key.match(/--core-color-gradient-(\w+)-\d+/);
        if (match) {
            const colorName = match[1];
            if (!acc[colorName]) {
                acc[colorName] = {};
            }
            acc[colorName][key] = colors[key];
        }
        return acc;
    }, {});
};
