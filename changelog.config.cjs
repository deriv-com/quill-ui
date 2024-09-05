module.exports = {
    plugins: [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        [
            "@semantic-release/changelog",
            {
                changelogFile: "docs/CHANGELOG.md",
            },
        ],
        [
            "@semantic-release/git",
            {
                assets: ["docs/CHANGELOG.md"],
                message: "chore(changelog): update changelog [skip ci]",
            },
        ],
    ],
    noCi: true, // Prevents CI-related steps
};
