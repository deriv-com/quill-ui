const fs = require("fs");
const path = require("path");

const designTokens = require("./tokens.json");
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
  "semantic/theme/light",
  "semantic/theme/dark",
];

const semanticTokenNames = [
  "semantic/viewPort/640-plus",
  "semantic/viewPort/768-plus",
  "semantic/viewPort/1024-plus",
  "semantic/viewPort/1280-plus",
  "semantic/viewPort/1440-plus",
];

clusteredTokens = ["semantic-typography"];

const coreRules = {};

const convertCSSkey = (cssKey) => {
  return `$${cssKey.replaceAll(".", "-")}`;
};

const isObject = (item) => typeof item === "object";
const camelToKebab = (camelCase) =>
  camelCase.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const extractCSSValues = (key, value) => {
  const isClusteredToken = clusteredTokens.some((token) => key.includes(token));

  if (isClusteredToken) {
    handleClusteredTokens(key, value);
    return "skip";
  }

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
  if (Array.isArray(value)) {
    const cssGroupValue = [];
    value.map((cssValue) => {
      cssGroupValue.push(extractCSSValues(key, cssValue));
    });

    return cssGroupValue.join(",");
  } else if (isObject(value)) {
    return extractCSSValues(key, value);
  } else {
    return isNaN(value) ? value : `${value}px`;
  }
};

const handleClusteredTokens = (key, data) => {
  let clusteredSassClass = `(\n`;

  Object.keys(data).map((cssRuleKey) => {
    const cssValue = data[cssRuleKey];
    clusteredSassClass += `${camelToKebab(cssRuleKey)}: ${
      cssValue || '""'
    }, \n`;
  });
  clusteredSassClass += `)`;

  coreRules[key] = clusteredSassClass;
};

const generateSassVariables = (obj, prefix = "", origin = "") => {
  const valueIdentifier = "value";

  for (const key in obj) {
    const cssValue = obj[key];
    const isValueObject = isObject(cssValue);
    let keyName = `${prefix}${key}-`;
    keyName = tokenNames.some((item) => keyName.includes(item)) ? "" : keyName;
    const finalKey = prefix.substring(0, prefix.length - 1); // Remove "-" generated from the previous iteration

    // Recursive call for nested objects
    if (isValueObject && key !== valueIdentifier) {
      // Non token variables are excluded
      if (!excludedKeys.includes(key)) {
        generateSassVariables(obj[key], keyName, origin || key);
      }
    } else {
      if (key === valueIdentifier) {
        const cssKey = finalKey.replaceAll("-", ".");
        const finalValue = processCSSValue(finalKey, cssValue);

        if (finalValue !== "skip") {
          coreRules[cssKey] = finalValue;
        }
      }
    }
  }

  return coreRules;
};

const generateSemanticValues = (objectTokens) => {
  const newObjectTokens = { ...objectTokens };
  const viewPortData = Object.keys(objectTokens).filter((key) =>
    semanticTokenNames.some((token) => key.includes(token))
  );

  const viewPorts = semanticTokenNames.map((str) => {
    const match = str.match(/(\d+)-plus/);
    return match ? parseInt(match[1]) : null;
  });

  let semanticRules = ``;

  viewPorts.map((viewPort) => {
    const viewPortClassKeys = viewPortData.filter((e) => e.includes(viewPort));

    semanticRules += `\n @media screen and (min-width: ${viewPort}px) {\n`;

    viewPortClassKeys.map((ck) => {
      const classKeyData = objectTokens[ck];
      delete newObjectTokens[ck]; // delete so it won't get generated as a normal sass rule

      const sassKey = semanticTokenNames
        .reduce((modifiedString, token) => {
          const regex = new RegExp(token.replace(/\+/g, "\\+"), "g");
          return modifiedString.replace(regex, "");
        }, ck)
        .replace("-", "$");

      semanticRules += `${sassKey}: ${classKeyData}; \n`;
    });

    semanticRules += `} \n`;
  });

  // Remove semantic items so it will not get iterated in the global viewport
  semanticTokenNames.forEach((token) =>
    Object.keys(newObjectTokens).forEach((key) => {
      const sanitizedKey = key.replace(/[./-]/g, ""); // Remove dots, slashes, and hyphens
      const sanitizedToken = token.replace(/[./-]/g, ""); // Remove dots, slashes, and hyphens

      if (sanitizedKey.includes(sanitizedToken)) {
        delete newObjectTokens[key];
      }
    })
  );

  return {
    semanticRules,
    newObjectTokens,
  };
};

const mapSASSValues = (designTokens) => {
  const objectTokens = generateSassVariables(designTokens);

  let sassContent = ``;

  const { semanticRules, newObjectTokens } =
    generateSemanticValues(objectTokens);

  Object.keys(newObjectTokens).map((tokenKey) => {
    const tokenValue = newObjectTokens[tokenKey];
    sassContent += `${convertCSSkey(tokenKey)}: ${tokenValue};\n`;
  });

  sassContent += semanticRules;

  // Map token variables
  Object.keys(newObjectTokens).map((key) => {
    sassContent = sassContent.replaceAll(`{${key}}`, convertCSSkey(key));
  });

  return sassContent;
};

const generateSassFile = () => {
  const sassContent = mapSASSValues(designTokens);

  const sassFilePath = "css/quill.scss";
  const dirPath = path.dirname(sassFilePath);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(sassFilePath, sassContent);

  console.log(
    `Quill UI SASS variables was generated successfully: ${sassFilePath}`
  );
};

generateSassFile();
