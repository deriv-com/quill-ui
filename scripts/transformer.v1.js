import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Transformer {
    constructor() {
        this.allRules = {};
        this.semanticTokenNames = [
            "semantic/viewPort/640-plus",
            "semantic/viewPort/768-plus",
            "semantic/viewPort/1024-plus",
            "semantic/viewPort/1280-plus",
            "semantic/viewPort/1440-plus",
        ];
        this.themeTokenNames = ["semantic/theme/light", "semantic/theme/dark"];
        this.tokenNames = [
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
            "component/component",
            "semantic/global",
            "semantic/viewPort/default",
        ];
        this.allTokenNames = [
            ...this.tokenNames,
            ...this.semanticTokenNames,
            ...this.themeTokenNames,
        ];
        this.breakpointNames = ["sm", "md", "lg", "xl", "2xl"];
        this.coreRules = {};

        this.designTokens = JSON.parse(
            fs.readFileSync(
                path.resolve(__dirname, "../data/tokens.json"),
                "utf-8",
            ),
        );
        this.excludedKeys = ["$themes", "$metadata"];

        this.styleCategoryNames = {
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
            component: "component",
            gap: "paragraphSpacing",
            border: "border",
            elevation: "elevation",
            motion: "motion",
            size: ".size.",
            static: "temp",
            others: "others",
        };
        this.styleStrings = Object.fromEntries(
            Object.keys(this.styleCategoryNames).map((key) => [key, ""]),
        );

        this.mapSassValues();
        this.generateFiles();
    }

    convertCSSkey = (cssKey, prefix = true) => {
        const pref = prefix ? "--" : "";
        return `${pref}${cssKey.replaceAll(".", "-")}`;
    };

    convertHexes = (str) => {
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

    extractCSSValues = (key, value) => {
        const filteredKeys = ["type"];

        const CSSValues = [];
        Object.keys(value).map((k) => {
            if (!filteredKeys.includes(k)) {
                CSSValues.push(value[k]);
            }
        });

        return CSSValues.join(" ");
    };

    generateBreakpoints = () => {
        const breakpointMap = {};

        this.semanticTokenNames.forEach((tokenName, index) => {
            const parts = tokenName.split("/");
            const minWidth = parseInt(parts[2].split("-")[0]); // Extract the minWidth and convert it to an integer
            const breakpoint = this.breakpointNames[index];

            breakpointMap[minWidth] = breakpoint;
        });

        let sassString = `@mixin breakpoint($breakpoint) {\n`;

        // Generate the Sass mixin string using the dynamically populated breakpointMap
        Object.entries(breakpointMap).forEach(([minWidth, breakpoint], bk) => {
            sassString += `@${bk === 0 ? "if" : "else if"} $breakpoint == "${breakpoint}" {
                            @media (min-width: ${minWidth}px) {
                            @content;
                            }
                        }\n`;
        });

        sassString += `  @else {
                            @warn "Unknown breakpoint: #{$breakpoint}.";
                        }
                    }\n\n`;

        return sassString;
    };

    generateFiles = () => {
        console.log("Successfully generated CSS files:");

        Object.keys(this.styleStrings).map((fileName) => {
            const cssVariables = this.trimEmptyDeclarations(
                this.styleStrings[fileName],
                fileName,
            );

            const filePaths = [`lib/styles/quill/${fileName}.scss`];

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

    generateMediaQueryVariables = () => {
        Object.keys(this.styleStrings).map((styleString) => {
            const groupCode = this.styleCategoryNames[styleString];

            this.styleStrings[styleString] += `\n
             /* Media Queries for Semantic Tokens */ \n`;

            this.semanticTokenNames.map((name) => {
                const semanticTokenGroup = this.getTokenGroup([name]);
                const semanticObjectTokens = this.generateSassVariables({
                    data: semanticTokenGroup,
                });

                const viewportValue = (name.match(/\/(\d+)-plus$/) || [])[1];

                this.styleStrings[styleString] += `\n
                            @media (min-width: ${viewportValue}px)  { \n
                            :root { \n    
                            `;

                Object.keys(semanticObjectTokens).map((tokenKey) => {
                    const convertedKey = this.convertCSSkey(tokenKey);
                    const tokenValue = semanticObjectTokens[tokenKey];
                    if (tokenKey.includes(groupCode)) {
                        this.styleStrings[styleString] +=
                            `${convertedKey}: ${tokenValue};\n`;
                    }

                    if (
                        groupCode === "others" &&
                        !Object.values(this.styleStrings).some((e) =>
                            e.includes(convertedKey),
                        )
                    ) {
                        this.styleStrings.others += `${convertedKey}: ${tokenValue};\n`;
                    }
                });

                this.styleStrings[styleString] += "}\n}\n";
            });
        });
    };

    generateSassVariables = ({
        data,
        prefix = "",
        origin = "",
        reset = true,
    }) => {
        const valueIdentifier = "value";

        if (reset) {
            this.coreRules = {};
        }

        for (const key in data) {
            const cssValue = data[key];
            const isValueObject = this.isObject(cssValue);
            let keyName = `${prefix}${key}-`;

            // Filter key name by removing token category
            keyName = this.allTokenNames.some((item) => keyName.includes(item))
                ? ""
                : keyName;
            const finalKey = prefix.substring(0, prefix.length - 1); // Remove "-" generated from the previous iteration

            // Recursive call for nested objects
            if (isValueObject && key !== valueIdentifier) {
                // Non token variables are excluded
                if (!this.excludedKeys.includes(key)) {
                    this.generateSassVariables({
                        data: data[key],
                        prefix: keyName,
                        origin: origin || key,
                        reset: false,
                    });
                }
            } else {
                if (key === valueIdentifier) {
                    const cssKey = finalKey.replaceAll("-", ".");
                    const finalValue = this.processCSSValue(finalKey, cssValue);

                    this.coreRules[cssKey] = finalValue;
                    this.allRules[cssKey] = finalValue;
                }
            }
        }

        return this.coreRules;
    };

    generateThemeVariables = () => {
        Object.keys(this.styleStrings).map((styleString) => {
            const groupCode = this.styleCategoryNames[styleString];

            this.styleStrings[styleString] += `\n
                /* Theme Styling */ \n
                :root { \n    
                    `;

            this.themeTokenNames.map((name) => {
                const themeTokenGroup = this.getTokenGroup([name]);
                const themeObjectTokens = this.generateSassVariables({
                    data: themeTokenGroup,
                });

                const themeName = name.replace(/^.*?\/(.*?)\/(.*)$/, "$1--$2");

                this.styleStrings[styleString] += `\n .${themeName} { \n
    `;

                Object.keys(themeObjectTokens).map((tokenKey) => {
                    const convertedKey = this.convertCSSkey(tokenKey);
                    const tokenValue = themeObjectTokens[tokenKey];
                    if (tokenKey.includes(groupCode)) {
                        this.styleStrings[styleString] +=
                            `${convertedKey}: ${tokenValue};\n`;
                    }
                    if (
                        groupCode === "others" &&
                        !Object.values(this.styleStrings).some((e) =>
                            e.includes(convertedKey),
                        )
                    ) {
                        this.styleStrings.others += `${convertedKey}: ${tokenValue};\n`;
                    }
                });

                this.styleStrings[styleString] += "\n}\n";
            });

            this.styleStrings[styleString] += "\n}\n";
        });
    };

    getTokenGroup = (group) =>
        Object.fromEntries(
            Object.entries(this.designTokens).filter(([key]) =>
                group.includes(key),
            ),
        );

    isObject = (item) => typeof item === "object";

    mapSassValues = () => {
        const tokenGroup = this.getTokenGroup(this.tokenNames);
        const objectTokens = this.generateSassVariables({ data: tokenGroup });

        this.styleStrings.static = ``;
        // Add temporary static values
        for (let i = 1; i <= 300; i++) {
            this.styleStrings.static += `--temp-static-spacing-${i}: ${i}px;\n`;
        }

        this.styleStrings.static = `:root { \n  ${this.styleStrings.static}}`;

        Object.keys(this.styleStrings).map((styleString) => {
            const groupCode = this.styleCategoryNames[styleString];

            this.styleStrings[styleString] += `:root { \n`;

            Object.keys(objectTokens).map((tokenKey) => {
                const tokenValue = objectTokens[tokenKey];
                const convertedKey = this.convertCSSkey(tokenKey);

                if (tokenKey.includes(groupCode)) {
                    this.styleStrings[styleString] +=
                        `${this.convertCSSkey(tokenKey)}: ${tokenValue};\n`;
                }

                if (
                    groupCode === "others" &&
                    !Object.values(this.styleStrings).some((e) =>
                        e.includes(convertedKey),
                    )
                ) {
                    this.styleStrings.others += `${convertedKey}: ${tokenValue};\n`;
                }
            });

            this.styleStrings[styleString] += "}";
        });

        // Generate Media query rules
        this.generateMediaQueryVariables();

        // Generate theme rules
        this.generateThemeVariables();

        this.resolveTokenValues();

        // Do transformation on each files
        Object.keys(this.styleStrings).map((styleString) => {
            // Map token variables
            this.styleStrings[styleString] = this.mapTokenValues(
                objectTokens,
                this.styleStrings[styleString],
                styleString,
            );

            // Convert HEX values to RGBA
            this.styleStrings[styleString] = this.convertHexes(
                this.styleStrings[styleString],
            );
        });

        // Generate Breakpoint Mixins
        this.styleStrings.breakpoints = this.generateBreakpoints();
    };

    resolveTokenValues = () => {
        // Regular expression pattern to match {variable}
        const pattern = /\{([^\{\}]*)\}/g;

        // Array to store values that requires to be resolved based on core token values
        const valuesToResolve = [];

        for (const [_, value] of Object.entries(this.allRules)) {
            // Find all occurrences of the pattern in the value

            if (typeof value === "string") {
                const matches = value.match(pattern);

                if (matches) {
                    matches.forEach((match) => {
                        // Remove curly braces and push into the occurrences array
                        valuesToResolve.push(
                            match.substring(1, match.length - 1),
                        );
                    });
                }
            }
        }

        valuesToResolve.map((vKey) => {
            const tokenValue = this.allRules[vKey];
            Object.keys(this.allRules).map((ak) => {
                const oldValue = this.allRules[ak];

                if (typeof oldValue === "string") {
                    this.allRules[ak] = oldValue.replaceAll(
                        `{${vKey}}`,
                        tokenValue,
                    );
                }

                if (!(vKey in this.allRules)) {
                    throw new Error(`Couldn't find a value for ${vKey}`);
                }
            });
        });
    };

    mapTokenValues = (objectTokens, str) => {
        const regex = /\{([^{}]+)\}/g; // Regular expression to match {dynamic.variable} pattern
        const occurrences = [];
        let match;

        // Use a loop to find all matches
        while ((match = regex.exec(str)) !== null) {
            const dynamicName = match[1].trim(); // Get the content inside {} and trim whitespace

            // Check if the dynamicName is not empty and does not contain unwanted substrings
            if (dynamicName && !dynamicName.includes("\n")) {
                occurrences.push(dynamicName); // Push the matched content (dynamic.variable) into the occurrences array
            }
        }

        occurrences.forEach((occ) => {
            const tokenValue = this.allRules[occ];

            if (tokenValue !== undefined) {
                str = str.replaceAll(`{${occ}}`, tokenValue);
            } else {
                throw new Error(`Couldn't map a value for ${occ}`);
            }
        });

        return str;
    };

    processCSSValue = (key, value) => {
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
                cssGroupValue.push(this.extractCSSValues(key, cssValue));
            });

            return cssGroupValue.join(",");
        } else if (this.isObject(value)) {
            return this.extractCSSValues(key, value);
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

    trimEmptyDeclarations = (cssString, fileName) => {
        const skipFiles = ["breakpoints"];

        if (skipFiles.includes(fileName)) {
            return cssString;
        }

        // Remove hanging comments
        cssString = cssString.replace(/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, "");

        /***  Handle specific token issues  ***/
        // Convert empty fontWeight to normal
        cssString = cssString.replace(
            /fontWeight:\s*;/g,
            "fontWeight: normal;",
        );

        // Preserve spaces for fontFamily property
        cssString = cssString.replace(
            /fontFamily:[^;]+/g,
            (match) => match.replace(/\s+/g, " "), // Replace only spaces within the value
        );

        // Remove unnecessary spaces, tabs, and newlines
        cssString = cssString.replace(/\s*([{}:;,])\s*/g, "$1");

        // Remove empty media query declarations
        cssString = cssString.replace(/@media\s*\(.*?\)\s*{\s*}\s*/g, "");

        // Remove empty class declarations
        cssString = cssString.replace(/\.([^{}]+){}/g, "");

        // Remove empty root declarations
        cssString = cssString.replace(/:root\s*{\s*}/g, "");

        // Remove additional empty @media queries
        cssString = cssString.replace(
            /@media\s*\(min-width:[^}]*\)\s*{\s*}\s*/g,
            "",
        );

        return cssString;
    };
}

new Transformer();
