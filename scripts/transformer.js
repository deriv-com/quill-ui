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
const camelToKebab = (camelCase) =>
    camelCase.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

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

const generateSemanticValues = (objectTokens) => {
    const newObjectTokens = { ...objectTokens };
    const viewPortData = Object.keys(objectTokens).filter((key) =>
        semanticTokenNames.some((token) => key.includes(token)),
    );

    let semanticRules = ``;

    const mediaQueryData = {};

    viewPortData.map((ck) => {
        const classKeyData = objectTokens[ck];

        const sassKey = convertCSSkey(
            semanticTokenNames
                .reduce((modifiedString, token) => {
                    const regex = new RegExp(token.replace(/\+/g, "\\+"), "g");
                    return modifiedString.replace(regex, "");
                }, ck)
                .replace("-", " ")
                .replace(".plus.", ""),
            false,
        );

        const processedKey = convertCSSkey(ck, false);

        const viewportNumber = ((match) =>
            match ? parseInt(match[1], 10) : null)(
            processedKey.match(/\/(\d+)-/),
        );

        if (!mediaQueryData[sassKey]) {
            mediaQueryData[sassKey] = [];
        }

        const newViewportData = {
            viewport: viewportNumber,
            data: classKeyData,
        };

        mediaQueryData[sassKey].push(newViewportData);
    });

    Object.keys(mediaQueryData).map((classKey) => {
        const queryData = mediaQueryData[classKey];

        semanticRules += `@mixin ${classKey}() { \n`;

        queryData.map(({ viewport, data }) => {
            let formattedData = data
                .replace(/^(\()/, "{")
                .replace(/(\))$/, "}")
                .replace(/,/g, ";");

            if (!formattedData.includes("\n")) {
                formattedData = `{ ${formattedData} }`;
            }

            semanticRules += `@media (min-width: ${viewport}px) \n
                ${formattedData} \n`;
        });

        semanticRules += `} \n`;
    });

    // Remove semantic items so it will not get iterated in the global viewport
    semanticTokenNames.forEach((token) =>
        Object.keys(newObjectTokens).forEach((key) => {
            const sanitizedKey = key.replace(/[./-]/g, ""); // Remove dots, slashes, and hyphens
            const sanitizedToken = token.replace(/[./-]/g, ""); // Remove dots, slashes, and hyphens

            if (sanitizedKey.includes(sanitizedToken)) {
                // console.log(`deleting.... ${key}`);
                delete newObjectTokens[key];
            }
        }),
    );

    return {
        semanticRules,
        newObjectTokens,
    };
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
        console.log(themeName);

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

    Object.keys(objectTokens).map((tokenKey) => {
        const tokenValue = objectTokens[tokenKey];
        sassContent += `${convertCSSkey(tokenKey)}: ${tokenValue};\n`;
    });

    sassContent += "}";

    sassContent += generateMediaQueryVariables();
    sassContent += generateThemeVariables();

    // Map token variables
    Object.keys(objectTokens).map((key) => {
        sassContent = sassContent.replaceAll(
            `{${key}}`,
            `var(${convertCSSkey(key)})`,
        );
    });

    return sassContent;
};

const generateSassFile = () => {
    const sassContent = mapSASSValues();

    const sassFilePath = "lib/styles/quill.css";
    const dirPath = path.dirname(sassFilePath);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(sassFilePath, sassContent);

    console.log(
        `Quill UI CSS variables was generated successfully: ${sassFilePath}`,
    );
};

generateSassFile();
