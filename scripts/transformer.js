import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const designTokens = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/tokens.json"), "utf-8"),
);

const excludedKeys = ["$themes", "$metadata"];
const tokenNames = [
    "core/border",
    "core/color/solid",
    "core/color/opacity",
    "core/color/gradients",
    "core/boxShadow",
    "core/opacity",
    "core/spacing",
    "core/typography",
    "core/motion",
    "core/sizing",
    "semantic/global",
    "semantic/viewPort/default",
];

const semanticTokenNames = [
    "semantic/viewPort/640-plus",
    "semantic/viewPort/768-plus",
    "semantic/viewPort/1024-plus",
    "semantic/viewPort/1280-plus",
    "semantic/viewPort/1440-plus",
];

const themeTokenNames = ["semantic/theme/light", "semantic/theme/dark"];

const allTokenNames = [
    ...tokenNames,
    ...semanticTokenNames,
    ...themeTokenNames,
];

const getTokenGroup = (group) =>
    Object.fromEntries(
        Object.entries(designTokens).filter(([key]) => group.includes(key)),
    );

const convertCSSkey = (cssKey, prefix = true) => {
    const pref = prefix ? "--" : "";
    return `${pref}${cssKey.replaceAll(".", "-")}`;
};

const isObject = (item) => typeof item === "object";

const extractCSSValues = (key, value) => {
    const filteredKeys = ["type"];

    const CSSValues = [];
    Object.keys(value).map((k) => {
        if (!filteredKeys.includes(k)) {
            CSSValues.push(value[k]);
        }
    });

    return CSSValues.join(" ");
};

const processCSSValue = (key, value) => {
    const noUnitKeys = ["fontWeight"];
    const percentageKeys = ["opacity"];
    const propertyGroup = key.split("-");
    const propertyName = propertyGroup[propertyGroup.length - 1];
    const defaultValues = {
        letterSpacing: "normal",
    };

    if (Array.isArray(value)) {
        const cssGroupValue = [];
        value.map((cssValue) => {
            cssGroupValue.push(extractCSSValues(key, cssValue));
        });

        return cssGroupValue.join(",");
    } else if (isObject(value)) {
        return extractCSSValues(key, value);
    } else {
        if (noUnitKeys.some((k) => key.includes(k))) {
            return value;
        }

        if (percentageKeys.some((k) => key.includes(k))) {
            if (value.includes("%")) {
                const percentageValue = parseInt(value) * 0.01;

                return percentageValue;
            }
        }

        if (value === "") {
            const defaultValue = defaultValues[propertyName];

            if (defaultValue) {
                return defaultValue;
            }
        }

        return isNaN(value) ? value : `${value}px`;
    }
};

let coreRules = {};
const generateSassVariables = ({
    data,
    prefix = "",
    origin = "",
    reset = true,
}) => {
    const valueIdentifier = "value";

    if (reset) {
        coreRules = {};
    }

    for (const key in data) {
        const cssValue = data[key];
        const isValueObject = isObject(cssValue);
        let keyName = `${prefix}${key}-`;

        // Filter key name by removing token category
        keyName = allTokenNames.some((item) => keyName.includes(item))
            ? ""
            : keyName;
        const finalKey = prefix.substring(0, prefix.length - 1); // Remove "-" generated from the previous iteration

        // Recursive call for nested objects
        if (isValueObject && key !== valueIdentifier) {
            // Non token variables are excluded
            if (!excludedKeys.includes(key)) {
                generateSassVariables({
                    data: data[key],
                    prefix: keyName,
                    origin: origin || key,
                    reset: false,
                });
            }
        } else {
            if (key === valueIdentifier) {
                const cssKey = finalKey.replaceAll("-", ".");
                const finalValue = processCSSValue(finalKey, cssValue);

                coreRules[cssKey] = finalValue;
            }
        }
    }

    return coreRules;
};

const generateMediaQueryVariables = () => {
    let sassContent = ``;

    sassContent += `\n
    /* Media Queries for Semantic Tokens */ \n`;

    semanticTokenNames.map((name) => {
        const semanticTokenGroup = getTokenGroup([name]);
        const semanticObjectTokens = generateSassVariables({
            data: semanticTokenGroup,
        });

        const viewportValue = (name.match(/\/(\d+)-plus$/) || [])[1];

        sassContent += `\n
    @media (min-width: ${viewportValue}px)  { \n
    :root { \n    
    `;

        Object.keys(semanticObjectTokens).map((tokenKey) => {
            const tokenValue = semanticObjectTokens[tokenKey];
            sassContent += `${convertCSSkey(tokenKey)}: ${tokenValue};\n`;
        });

        sassContent += "}\n}\n";
    });

    return sassContent;
};

const generateThemeVariables = () => {
    let sassContent = ``;

    sassContent += `\n
    /* Theme Styling */ \n
    :root { \n    
        `;

    themeTokenNames.map((name) => {
        const themeTokenGroup = getTokenGroup([name]);
        const themeObjectTokens = generateSassVariables({
            data: themeTokenGroup,
        });

        const themeName = name.replace(/^.*?\/(.*?)\/(.*)$/, "$1--$2");

        sassContent += `\n .${themeName} { \n
    `;

        Object.keys(themeObjectTokens).map((tokenKey) => {
            const tokenValue = themeObjectTokens[tokenKey];
            sassContent += `${convertCSSkey(tokenKey)}: ${tokenValue};\n`;
        });

        sassContent += "\n}\n";
    });

    sassContent += "\n}\n";

    return sassContent;
};

const mapSASSValues = () => {
    const tokenGroup = getTokenGroup(tokenNames);
    const objectTokens = generateSassVariables({ data: tokenGroup });

    let sassContent = `:root { \n`;

    // Add temporary static values
    for (let i = 1; i <= 300; i++) {
        sassContent += `--static-spacing-${i}: ${i}px;\n`;
    }

    Object.keys(objectTokens).map((tokenKey) => {
        const tokenValue = objectTokens[tokenKey];
        sassContent += `${convertCSSkey(tokenKey)}: ${tokenValue};\n`;
    });

    sassContent += "}";

    sassContent += generateMediaQueryVariables();
    sassContent += generateThemeVariables();

    // Map token variables
    sassContent = mapTokenValues(objectTokens, sassContent);

    // Convert HEX values to RGBA
    sassContent = convertHexes(sassContent);

    return sassContent;
};

const checkKeysExist = (objectTokens, str) => {
    const keysArray = Object.keys(objectTokens);
    const keyExists = keysArray.some((key) => str.includes(key));

    return keyExists;
};

const mapTokenValues = (objectTokens, str) => {
    Object.keys(objectTokens).map((key) => {
        const tokenValue = objectTokens[key];

        str = str.replaceAll(`{${key}}`, tokenValue);
    });

    if (checkKeysExist(objectTokens, str)) {
        str = mapTokenValues(objectTokens, str);
    }

    return str;
};

const convertHexes = (str) => {
    const rgbaRegex =
        /rgba\(\s*#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\s*,?\s*(\d*\.?\d+|0)\)/g;

    const replaceRgba = (_, hexColor, opacity) => {
        // Convert hex color to RGBA
        const red = parseInt(hexColor.substring(0, 2), 16);
        const green = parseInt(hexColor.substring(2, 4), 16);
        const blue = parseInt(hexColor.substring(4, 6), 16);

        return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
    };

    return str.replaceAll(rgbaRegex, replaceRgba);
};

const generateSassFile = () => {
    const sassContent = mapSASSValues();

    const filePaths = ["lib/styles/quill.scss", "lib/styles/quill.css"];

    filePaths.map((item) => {
        const dirPath = path.dirname(item);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        fs.writeFileSync(item, sassContent);

        console.log(
            `Quill UI CSS variables was generated successfully: ${item}`,
        );
    });
};

generateSassFile();
