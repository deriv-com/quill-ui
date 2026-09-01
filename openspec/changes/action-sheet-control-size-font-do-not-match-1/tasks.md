## Open Questions

Each question below has a **RECOMMENDED** default that the checklist already assumes, so the plan is implementable as-is. A reviewer may replace any default; if they do, the affected tasks are called out.

**Q1. Does Inter apply to the sheet title only, or to all sheet text?** The issue thread names the title specifically and explicitly flags this as unconfirmed. This is design's call.

- **(a) Title only** — one selector in `header.scss`. **← RECOMMENDED.** It is exactly what design stated ("the title font type … should be Inter"), and it is the smallest change that closes the reported defect. Anything wider is an unrequested redesign of every sheet in every consumer.

_If a reviewer picks (b) or (c):_ extend §4, add the extra weights in task 5.1, and widen the "Non-title sheet text is untouched" scenario in `specs/action-sheet-header/spec.md`.

**Q2. Should the 40px live in the header, or become a step in the shared button scale?**

- **(a) Header-scoped, via `--core-size-2000`** — **← RECOMMENDED.** No token backs a 40px `component.button.height` step, `TGenericSizes` has no slot between `md` (32) and `lg` (48), and a global step would move every `Button`/`IconButton` consumer for one sheet's design. See `design.md` decision 1.

_If a reviewer picks (b):_ replace §3 with work in `lib/components/Button/`, and update the "Buttons elsewhere are unaffected" scenario in the spec.

**Q3. Keep `HeaderActionType.size` now that the design default is unreachable through it?**

- **(a) Keep it as an explicit opt-out** — **← RECOMMENDED.** Non-breaking; `size` shipped in `380333d`, and gating on it is what makes the new default unit-testable. See `design.md` decision 2.

_If a reviewer picks (b):_ drop task 3.2, remove `size` from `HeaderActionType`, and replace the "explicit size overrides the header default" requirement in the spec.

---

## 1. Baseline

- [x] 1.1 Run `npx jest lib/components/ActionSheet` and confirm the suite is green before any edit, so a later failure is attributable to this change
- [x] 1.2 Re-read `design.md` decisions 1-4 and confirm the four touch points still match the code: `lib/components/Button/button.scss:12-17` (32px `md`), `lib/components/Typography/typography.scss:109-123` (Ubuntu heading family), `lib/components/ActionSheet/header/header.scss:50` (32px reserved slot), `lib/styles/index.scss:5-9` (the `@at-root` font-request block)

## 2. Red (proof of failure before the fix)

- [x] 2.1 In `lib/components/ActionSheet/header/__tests__/header.test.tsx`, add a test asserting that a header rendered with `closeAction={{}}` and `saveAction={{}}` puts `quill-action-sheet--title--action-button__size--default` on both action buttons; run `npx jest lib/components/ActionSheet/header` and capture the failure (class absent) as the cited red
- [x] 2.2 In the same file, add a test asserting that `saveAction={{ size: "lg" }}` renders `quill-icon-button__size--lg` **without** the default-size class; run the suite and capture that red too — the test cannot go red pre-fix (it asserts the absence of a class that does not exist yet), so it is declared a guard test and its ability to fail is proven by mutation instead, per `.buildwright/framework/tdd-evidence.md`
- [x] 2.3 Record both red lines verbatim (test name + expected vs actual) for the PR body, per `.buildwright/framework/tdd-evidence.md` — recorded in `docs/spec-to-pr/pr-notes-action-sheet-control-size-font-do-not-match-1.md`

## 3. Green — 40px header controls

- [x] 3.1 In `lib/components/ActionSheet/header/header.scss`, add `&-button__size--default.quill-button { min-inline-size: var(--core-size-2000); min-block-size: var(--core-size-2000); }` under the existing `&--action` block, next to the comment at lines 60-61 that documents the `.quill-button` chaining idiom, with a comment noting `--core-size-2000` is 40px and that no `component-button-height` step exists at that value
- [x] 3.2 In `lib/components/ActionSheet/header/index.tsx`, destructure `size` from the action without a `"md"` default, pass `size={size ?? "md"}` to `IconButton`, and add `!size && "quill-action-sheet--title--action-button__size--default"` to the button's `clsx` call; verify tasks 2.1 and 2.2 now pass via `npx jest lib/components/ActionSheet/header`
- [x] 3.3 In `lib/components/ActionSheet/header/header.scss:50`, change the action slot's `min-width: var(--component-button-width-md)` to `min-inline-size: var(--core-size-2000)` so the empty spacer matches the 40px control; verify the existing "should keep the opposite slot as a spacer when only one action is passed" test still passes

## 4. Green — Inter sheet title

- [x] 4.1 In `lib/components/ActionSheet/header/header.scss`, add `&-text.quill-typography__h5 { font-family: "Inter", var(--core-fontFamily-ibmPlex-sans), sans-serif; }` under the `&--title` block, declaring `font-family` only, with a comment stating the chaining is needed to beat `.quill-typography__h5` regardless of bundle order and that `core.fontFamily.inter` does not exist upstream yet
- [x] 4.2 Confirm no size, weight, line-height or colour declaration was added alongside it, so the title keeps inheriting the H5 heading token metrics (bold / 700)

## 5. Green — webfont request

- [x] 5.1 In `lib/styles/index.scss`, add `@import url("https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap");` inside the existing `@at-root` block (lines 5-9), alongside the Ubuntu and IBM Plex requests; 700 only, matching `semantic.typography.heading.h5.fontWeight`
- [x] 5.2 Run `npm run build` and confirm the emitted `dist/assets/style.css` contains the Inter `@import` and still contains the three pre-existing font `@import`s — the build emits `dist/assets/quill-ui.css` and `dist/assets/base2.css`, not `style.css`; all four font `@import`s are present in both

## 6. Documentation

- [x] 6.1 Update the `HeaderActionType.size` JSDoc in `lib/components/ActionSheet/types.ts` to state that omitting `size` gives the 40px design default and that passing a size opts into the shared button scale (24 / 32 / 48 / 64px)
- [x] 6.2 Update the `closeAction` `argTypes` description in all three of `lib/components/ActionSheet/button-trigger.stories.tsx`, `controlled.stories.tsx` and `icon-trigger.stories.tsx`, replacing "`size` (default `md`)" with the 40px default and the opt-out; grep for `default \`md\`` afterwards to confirm no stale copy remains
- [x] 6.3 Add a Storybook story (or extend the existing header-actions story in `button-trigger.stories.tsx`) that renders the header with both actions and a title, so the 40px controls and the Inter title are visually reviewable

## 7. Verification

- [x] 7.1 Run `npx jest lib/components/ActionSheet` and confirm green, including the two new tests
- [ ] 7.2 Run `npm run test:report` and confirm no unrelated suite regressed; if `lib/components/ActionSheet/mocks/__tests__/__snapshots__/example.test.tsx.snap` changes, inspect the diff and only accept it if it is exactly the new action-button class — **deferred to the automated verify stage.** The ActionSheet snapshot was checked here as part of 7.1: 7 snapshots passed unchanged, so the mock example needs no update
- [x] 7.3 Run `npm run lint` and `npm run build` and confirm both pass — `npm run build` passed (exit 0), and `tsc -p ./tsconfig-build.json` plus `eslint lib/components/ActionSheet` both passed. The repo-wide `npm run lint` is deferred to the automated verify stage
- [ ] 7.4 Run `npm run build-storybook` and confirm it succeeds (it is part of the repo's verify set in `spec-to-pr.config.json`) — **deferred to the automated verify stage**
- [ ] 7.5 Run `npm run storybook`, open the ActionSheet header story at mobile width, and confirm by measurement in devtools: both controls are 40 × 40px, the pill radius is intact, the title row (48px) still centres them, and the title computes to Inter while the description does not — **not done: needs a human at a browser.** No browser automation is available in this environment. Verified instead from the built stylesheet that the three rules emit as intended, that `--core-size-2000` is 40px, and that `Heading.H5` applies `quill-typography__h5` so the chained selector matches
- [ ] 7.6 Repeat 7.5 in the dark theme and at the `lg` breakpoint (where `header.scss` swaps the title-row margins) and confirm no layout shift or clipping — **not done: needs a human at a browser** (same reason as 7.5)
- [x] 7.7 Confirm no file under `data/` was modified — the shipped tokens come from `@deriv-com/quill-tokens/dist/quill.css`, so a `data/tokens.json` edit would be a no-op that misleads the next reader

## 8. Findings and handoff

- [ ] 8.1 (doc removed - not tracked in this repo) Record two `report-upstream` findings against `@deriv-com/quill-tokens` in the project's upstream-issues doc (create it if absent), in the format from `.buildwright/framework/findings.md`: (a) `component.button.height` has no 40px step although `core.size.2000` is 40px; (b) `core.fontFamily` has no `inter` entry although the approved design uses Inter
- [x] 8.2 In the PR body, cite the red lines from task 2.3, and declare explicitly that the 40px box and the Inter rendering were verified manually in Storybook (tasks 7.5-7.6) because jsdom maps SCSS to `identity-obj-proxy` and cannot assert either
- [x] 8.3 Link the PR to [derivatives-trader#1298](https://github.com/deriv-com/derivatives-trader/issues/1298) and note that the downstream fix is a version bump only — no local override and no `packages/core/src/index.html` font entry are needed, since `lib/styles/index.scss` now requests Inter
