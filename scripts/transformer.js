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

const styleCategoryNames = {
    spacing: "spacing",
    opacity: "core.opacity",
    color: "color.solid",
    "color.gradient": "color.gradient",
    "color.opacity": "color.opacity",
    "color.semantic": "semantic.color",
    "font.size": "fontSize",
    "font.weight": "fontWeight",
    "font.family": "fontFamily",
    "line.height": "lineHeight",
    "letter.spacing": "letterSpacing",
    "text.decoration": "textDecoration",
    gap: "paragraphSpacing",
    border: "border",
    elevation: "elevation",
    motion: "motion",
    size: ".size.",
    static: "temp",
    others: "others",
};

const styleStrings = Object.fromEntries(
    Object.keys(styleCategoryNames).map((key) => [key, ""]),
);

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

const generateMediaQueryVariables = (styleStrings) => {
    Object.keys(styleStrings).map((styleString) => {
        const groupCode = styleCategoryNames[styleString];

        styleStrings[styleString] += `\n
    /* Media Queries for Semantic Tokens */ \n`;

        semanticTokenNames.map((name) => {
            const semanticTokenGroup = getTokenGroup([name]);
            const semanticObjectTokens = generateSassVariables({
                data: semanticTokenGroup,
            });

            const viewportValue = (name.match(/\/(\d+)-plus$/) || [])[1];

            styleStrings[styleString] += `\n
    @media (min-width: ${viewportValue}px)  { \n
    :root { \n    
    `;

            Object.keys(semanticObjectTokens).map((tokenKey) => {
                const convertedKey = convertCSSkey(tokenKey);
                const tokenValue = semanticObjectTokens[tokenKey];
                if (tokenKey.includes(groupCode)) {
                    styleStrings[styleString] +=
                        `${convertedKey}: ${tokenValue};\n`;
                }

                if (
                    groupCode === "others" &&
                    !Object.values(styleStrings).some((e) =>
                        e.includes(convertedKey),
                    )
                ) {
                    styleStrings.others += `${convertedKey}: ${tokenValue};\n`;
                }
            });

            styleStrings[styleString] += "}\n}\n";
        });
    });

    return styleStrings;
};

const generateThemeVariables = (styleStrings) => {
    Object.keys(styleStrings).map((styleString) => {
        const groupCode = styleCategoryNames[styleString];

        styleStrings[styleString] += `\n
    /* Theme Styling */ \n
    :root { \n    
        `;

        themeTokenNames.map((name) => {
            const themeTokenGroup = getTokenGroup([name]);
            const themeObjectTokens = generateSassVariables({
                data: themeTokenGroup,
            });

            const themeName = name.replace(/^.*?\/(.*?)\/(.*)$/, "$1--$2");

            styleStrings[styleString] += `\n .${themeName} { \n
    `;

            Object.keys(themeObjectTokens).map((tokenKey) => {
                const convertedKey = convertCSSkey(tokenKey);
                const tokenValue = themeObjectTokens[tokenKey];
                if (tokenKey.includes(groupCode)) {
                    styleStrings[styleString] +=
                        `${convertedKey}: ${tokenValue};\n`;
                }
                if (
                    groupCode === "others" &&
                    !Object.values(styleStrings).some((e) =>
                        e.includes(convertedKey),
                    )
                ) {
                    styleStrings.others += `${convertedKey}: ${tokenValue};\n`;
                }
            });

            styleStrings[styleString] += "\n}\n";
        });

        styleStrings[styleString] += "\n}\n";
    });

    return styleStrings;
};

const mapSASSValues = () => {
    const tokenGroup = getTokenGroup(tokenNames);
    const objectTokens = generateSassVariables({ data: tokenGroup });

    styleStrings.static = ``;
    // Add temporary static values
    for (let i = 1; i <= 300; i++) {
        styleStrings.static += `--temp-static-spacing-${i}: ${i}px;\n`;
    }

    styleStrings.static = `:root { \n  ${styleStrings.static}}`;

    let sassContent = ``;

    Object.keys(styleStrings).map((styleString) => {
        const groupCode = styleCategoryNames[styleString];

        styleStrings[styleString] += `:root { \n`;
        sassContent += `:root { \n`;

        Object.keys(objectTokens).map((tokenKey) => {
            const tokenValue = objectTokens[tokenKey];
            const convertedKey = convertCSSkey(tokenKey);

            if (tokenKey.includes(groupCode)) {
                sassContent += `${convertedKey}: ${tokenValue};\n`;
                styleStrings[styleString] +=
                    `${convertCSSkey(tokenKey)}: ${tokenValue};\n`;
            }

            if (
                groupCode === "others" &&
                !Object.values(styleStrings).some((e) =>
                    e.includes(convertedKey),
                )
            ) {
                styleStrings.others += `${convertedKey}: ${tokenValue};\n`;
            }
        });

        sassContent += "}";
        styleStrings[styleString] += "}";
    });

    // Generate Media query rules
    let newStyleStrings = generateMediaQueryVariables(styleStrings);

    // Generate theme rules
    newStyleStrings = generateThemeVariables(newStyleStrings);

    // Do transformation on each files
    Object.keys(newStyleStrings).map((styleString) => {
        // Map token variables
        newStyleStrings[styleString] = mapTokenValues(
            objectTokens,
            newStyleStrings[styleString],
        );

        // Convert HEX values to RGBA
        newStyleStrings[styleString] = convertHexes(
            newStyleStrings[styleString],
        );
    });

    return { sassContent, styleStrings: newStyleStrings };
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

const trimEmptyDeclarations = (cssString) => {
    // Remove all indentations, white spaces, and newlines
    cssString = cssString.replace(/\s+/g, "");

    // Remove empty media query declarations with empty root
    cssString = cssString.replace(/@media\(min-width:\d+px\){:root{}}/g, "");

    // Remove empty class declarations
    cssString = cssString.replace(/\.([^{}]+){}/g, "");

    // Remove empty root declarations
    cssString = cssString.replace(/:root{}+/g, "");

    // Remove hanging comments
    cssString = cssString.replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, "");

    /***  Handle specifc token issues  ***/
    // Convert empty fontWeight to normal
    cssString = cssString.replace(/fontWeight:\s*;/g, "fontWeight: normal;");

    return cssString;
};

const generateSassFile = () => {
    const { styleStrings } = mapSASSValues();

    console.log("Successfully generated CSS files:");

    Object.keys(styleStrings).map((fileName) => {
        const cssVariables = trimEmptyDeclarations(styleStrings[fileName]);
        const filePaths = [`lib/styles/sass/${fileName}.scss`];

        filePaths.map((item) => {
            const dirPath = path.dirname(item);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            fs.writeFileSync(item, cssVariables);

            console.log(`--${item}`);
        });
    });
};

generateSassFile();
