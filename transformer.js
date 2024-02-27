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
  "semantic/viewPort/640-plus",
  "semantic/viewPort/768-plus",
  "semantic/viewPort/1024-plus",
  "semantic/viewPort/1280-plus",
  "semantic/viewPort/1440-plus",
  "semantic/theme/light",
  "semantic/theme/dark",
];

clusteredTokens = [
  "semantic-typography-heading",
  "semantic-typography-body",
  "semantic-typography-caption",
  "semantic-typography-code",
  "semantic-typography-icon",
];

const coreRules = {};

const convertCSSkey = (cssKey) => {
  return `$${cssKey.replaceAll(".", "-")}`;
};

const isObject = (item) => typeof item === "object";
const camelToKebab = (camelCase) =>
  camelCase.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const extractCSSValues = (value) => {
  const filteredKeys = ["type"];

  const CSSValues = [];
  Object.keys(value).map((k) => {
    if (!filteredKeys.includes(k)) {
      CSSValues.push(value[k]);
    }
  });

  return CSSValues.join(" ");
};

const processCSSValue = (value) => {
  if (Array.isArray(value)) {
    const cssGroupValue = [];
    value.map((cssValue) => {
      cssGroupValue.push(extractCSSValues(cssValue));
    });

    return cssGroupValue.join(",");
  } else if (isObject(value)) {
    return extractCSSValues(value);
  } else {
    return isNaN(value) ? value : `${value}px`;
  }
};

const handleClusteredTokens = (key, data) => {
  let clusteredSassClass = `(\n`;

  Object.keys(data).map((cssRuleKey) => {
    const cssValue = data[cssRuleKey]?.value;
    clusteredSassClass += `${camelToKebab(cssRuleKey)}: ${
      cssValue || '""'
    }, \n`;
  });
  clusteredSassClass += `)`;

  coreRules[key] = clusteredSassClass;
};

const generateSassVariables = (
  obj,
  prefix = "",
  origin = "",
  prevData = null
) => {
  const valueIdentifier = "value";

  for (const key in obj) {
    const cssValue = obj[key];
    const isValueObject = isObject(cssValue);
    let keyName = `${prefix}${key}-`;
    keyName = tokenNames.some((item) => keyName.includes(item)) ? "" : keyName;
    const finalKey = prefix.substring(0, prefix.length - 1); // Remove "-" generated from the previous iteration

    const isClusteredToken = clusteredTokens.some((value) =>
      finalKey.includes(value)
    );

    if (isClusteredToken) {
      // Check if the cluster have the "value" property
      const itemKeys = Object.keys(cssValue);

      if (itemKeys.includes(valueIdentifier)) {
        handleClusteredTokens(finalKey, prevData);
        return false;
      }
    }

    // Recursive call for nested objects
    if (isValueObject && key !== valueIdentifier) {
      // Non token variables are excluded
      if (!excludedKeys.includes(key)) {
        generateSassVariables(obj[key], keyName, origin || key, cssValue);
      }
    } else {
      if (key === valueIdentifier) {
        const cssKey = finalKey.replaceAll("-", ".");
        coreRules[cssKey] = processCSSValue(cssValue);
      }
    }
  }

  return coreRules;
};

const mapSemanticValues = (designTokens) => {
  const objectTokens = generateSassVariables(designTokens);

  let sassContent = ``;

  Object.keys(objectTokens).map((tokenKey) => {
    const tokenValue = objectTokens[tokenKey];
    sassContent += `${convertCSSkey(tokenKey)}: ${tokenValue};\n`;
  });

  // Map token variables
  Object.keys(coreRules).map((key) => {
    sassContent = sassContent.replaceAll(`{${key}}`, convertCSSkey(key));
  });

  return sassContent;
};

const generateSassFile = () => {
  const sassContent = mapSemanticValues(designTokens);

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
