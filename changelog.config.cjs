/* eslint-disable @typescript-eslint/no-var-requires */
const transform = require("./release.utils.cjs");

module.exports = {
    repositoryUrl: "git@github.com:deriv-com/quill-ui.git",
    plugins: [
        [
            "@semantic-release/commit-analyzer",
            {
                releaseRules: [
                    {
                        type: "feat",
                        release: "minor",
                    },
                    {
                        type: "build",
                        release: "patch",
                    },
                    {
                        type: "ci",
                        release: "patch",
                    },
                    {
                        type: "chore",
                        release: "patch",
                    },
                    {
                        type: "docs",
                        release: "patch",
                    },
                    {
                        type: "refactor",
                        release: "patch",
                    },
                    {
                        type: "style",
                        release: "patch",
                    },
                    {
                        type: "test",
                        release: "patch",
                    },
                    {
                        type: "fix",
                        release: "patch",
                    },
                ],
            },
        ],
        [
            "@semantic-release/release-notes-generator",
            {
                parserOpts: {
                    mergePattern: /^Merge pull request #(\d+) from (.*)$/,
                    mergeCorrespondence: ["id", "source"],
                },
                writerOpts: { transform: transform },
            },
        ],
        "@semantic-release/changelog",
        [
            "@semantic-release/git",
            {
                assets: ["CHANGELOG.md"],
                message: "chore(changelog): update changelog [skip ci]",
            },
        ],
    ],
    noCi: true,
};
