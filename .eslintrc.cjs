module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        // This should be the last one
        "prettier",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh"],
    rules: {
        // TODO: Enable these rules and fix the errors
        "react-refresh/only-export-components": 0,
        "react-hooks/rules-of-hooks": 0,
        "react-hooks/exhaustive-deps": 0,
    },
};
