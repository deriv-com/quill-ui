const types = {
    maxSubjectLength: 72,
    bodyLineLength: 100,
    typesOrder: [
        "feat",
        "fix",
        "perf",
        "build",
        "refactor",
        "docs",
        "test",
        "ci",
        "chore",
        "style",
        "revert",
        "initial",
        "dependencies",
        "peerDependencies",
        "devDependencies",
        "metadata",
    ],
    types: {
        feat: {
            description: "A new feature",
            title: "Features",
            emoji: "✨",
            changelog: true,
            release: "minor",
            aliases: {
                initial: {
                    description: "Initial commit",
                    title: "Initial",
                    emoji: "🎉",
                },
            },
        },
        fix: {
            description: "A bug fix",
            title: "Bug Fixes",
            emoji: "🐛",
            changelog: true,
            release: "patch",
            aliases: {
                dependencies: {
                    description: "Update dependency",
                    title: "Dependencies",
                    emoji: "⬆️",
                    scope: "package",
                },
                peerDependencies: {
                    description: "Update peer dependency",
                    title: "Peer dependencies",
                    emoji: "⬆️",
                    scope: "package",
                },
                metadata: {
                    description: "Update metadata (package.json)",
                    title: "Metadata",
                    emoji: "📦",
                    scope: "package",
                },
            },
        },
        docs: {
            description: "Documentation only changes",
            title: "Documentation",
            emoji: "📚",
            changelog: true,
            release: { scope: "readme", release: "patch" },
        },
        style: {
            description:
                "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
            title: "Styles",
            emoji: "💎",
            changelog: true,
            release: false,
        },
        refactor: {
            description:
                "A code change that neither fixes a bug nor adds a feature",
            title: "Code Refactoring",
            emoji: "📦",
            changelog: true,
            release: false,
        },
        perf: {
            description: "A code change that improves performance",
            title: "Performance Improvements",
            emoji: "🚀",
            changelog: true,
            release: "patch",
        },
        test: {
            description: "Adding missing tests or correcting existing tests",
            title: "Tests",
            emoji: "🚨",
            changelog: true,
            release: false,
        },
        build: {
            description:
                "Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)",
            title: "Builds",
            emoji: "🛠",
            changelog: true,
            release: "patch",
        },
        ci: {
            description:
                "Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)",
            title: "Continuous Integrations",
            emoji: "⚙️",
            changelog: true,
            release: false,
        },
        chore: {
            description: "Other changes that don't modify src or test files",
            title: "Chores",
            emoji: "♻️",
            changelog: true,
            release: false,
            aliases: {
                devDependencies: {
                    description: "Update dev dependencies",
                    title: "Dev dependencies",
                    emoji: "⬆️",
                    scope: "package",
                },
            },
        },
        revert: {
            description: "Reverts a previous commit",
            title: "Reverts",
            emoji: "🗑",
            changelog: true,
            release: false,
        },
    },
};

const COMMIT_HASH_LENGTH = 7;

/**
 * Transform a parsed commit to render the changelog.
 *
 * @param {Object} commit commit parsed with `conventional-changelog-parser`.
 * @param {Object} context `conventional-changelog` context.
 * @return {Object} the transformed commit.
 */
const customTransform = (commit, context) => {
    const typeConfig = types.types[commit.type];

    if (
        !typeConfig ||
        !(typeConfig.changelog || (commit.notes && commit.notes.length > 0))
    ) {
        return null;
    }

    // conventional-changelog-writer now freezes the commit. Return a patch
    // instead of mutating the original object.
    const patch = {
        type: `${typeConfig.emoji ? typeConfig.emoji : ""} \t ${typeConfig.title}`,
    };

    if (commit.notes) {
        patch.notes = commit.notes.map((note) => ({
            ...note,
            title: "Breaking changes",
        }));
    }

    if (commit.scope === "*") {
        patch.scope = "";
    }

    if (typeof commit.hash === "string") {
        patch.shortHash = commit.hash.slice(0, COMMIT_HASH_LENGTH);
    }

    const referencedIssues = [];

    if (typeof commit.subject === "string") {
        let subject = commit.subject;
        let url = context.repository
            ? `${context.host}/${context.owner}/${context.repository}`
            : context.repoUrl;

        if (url) {
            url += "/issues/";
            subject = subject.replace(/#(\d+)/g, (_, issue) => {
                referencedIssues.push(issue);
                return `[#${issue}](${url}${issue})`;
            });
        }

        if (context.host) {
            subject = subject.replace(
                /\B@([a-z0-9](?:-?[a-z0-9]){0,38})/g,
                `[@$1](${context.host}/$1)`,
            );
        }

        patch.subject = subject;
    }

    if (commit.references) {
        patch.references = commit.references.filter(
            (reference) => !referencedIssues.includes(reference.issue),
        );
    }

    return patch;
};

module.exports = customTransform;
