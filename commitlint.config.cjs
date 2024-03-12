module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "body-max-line-length": [0, "never", "Infinity"],
        "subject-case": [0, "never", "sentence-case"],
        "footer-max-line-length": [0, "never", "Infinity"],
        "type-enum": [
            2,
            "always",
            [
                "feat",
                "fix",
                "docs",
                "style",
                "refactor",
                "perf",
                "test",
                "build",
                "ci",
                "chore",
                "revert",
            ],
        ],
    },
};
