# PR notes - action sheet control size and font do not match the approved design

Prepared during implementation for inclusion in the PR body. Covers tasks 2.3,
8.2 and 8.3 of
`openspec/changes/action-sheet-control-size-font-do-not-match-1/tasks.md`.

## Proof of red

Per `.buildwright/framework/tdd-evidence.md`, captured against the unfixed code
by running `npx jest lib/components/ActionSheet/header`:

```
Red: <ActionSheet.Header/> › should size both actions to the header default when no size is passed
     expected class "quill-action-sheet--title--action-button__size--default"
     got  "quill-button quill-icon-button__size--md quill__color--tertiary-black-white
           quill-action-sheet--title--action-button
           quill-action-sheet--title--action-button__color--monochrome"
```

The second test, `should drop the header default when the consumer passes a
size`, **could not go red before the fix** - it asserts the absence of a class
that did not exist yet, so it passed trivially on the unfixed code. It is not
presented as red -> green. Its ability to fail was instead proven by mutation:
replacing the `!size &&` gate in
`lib/components/ActionSheet/header/index.tsx` with `true &&` (design decision 2's
rejected "apply the 40px unconditionally" alternative) produces

```
Mutation red: <ActionSheet.Header/> › should drop the header default when the consumer passes a size
     expected element not to have class
     "quill-action-sheet--title--action-button__size--default", but it did
```

The mutation was reverted immediately; it is not part of the diff.

## Manual verification still required

`moduleNameMapper` maps SCSS to `identity-obj-proxy` (package.json jest config),
so jsdom can assert **which classes are applied** but never a computed pixel
value or font family. The unit tests therefore prove the class wiring only.

Verified mechanically instead, from the built stylesheets after `npm run build`:

-   `.quill-action-sheet--title--action-button__size--default.quill-button{min-inline-size:var(--core-size-2000);min-block-size:var(--core-size-2000)}`
-   `.quill-action-sheet--title--action{...;min-inline-size:var(--core-size-2000)}`
-   `.quill-action-sheet--title-text.quill-typography__h5{font-family:"Inter",var(--core-fontFamily-ibmPlex-sans),sans-serif}`
-   all four webfont requests present (Ubuntu, IBM Plex Sans, IBM Plex Mono, Inter)
-   `--core-size-2000` is `40px` in `@deriv-com/quill-tokens@2.0.13`

**Not yet done - needs a human at a browser** (tasks 7.5 and 7.6): open the
`ActionSheet / HeaderActionsActive` story at mobile width and confirm by
measurement in devtools that both controls are 40 x 40px, the pill radius is
intact, the 48px title row still centres them, and the title computes to Inter
while the description does not. Repeat in the dark theme and at the `lg`
breakpoint, where `header.scss` swaps the title-row margins, checking for layout
shift and clipping. `HeaderActionsExplicitSize` covers the 48px opt-out.

## Downstream

Fixes the library side of
[derivatives-trader#1298](https://github.com/deriv-com/derivatives-trader/issues/1298).
Once released, that repo needs a version bump only: no local stylesheet override
and no extra Google Fonts entry in `packages/core/src/index.html`, because
`lib/styles/index.scss` now requests Inter and any Typography import pulls that
stylesheet in.

## Upstream

Two token gaps recorded in `docs/upstream-issues.md`: no 40px
`component.button.height` step, and no `core.fontFamily.inter`.

## Pre-existing issue noticed, not fixed here

`package.json` maps `exports["./styles"]` to `./dist/assets/style.css`, but the
build never emits that file - `vite.config.ts` uses
`assetFileNames: "assets/[name][extname]"`, so the bundled stylesheet lands at
`dist/assets/quill-ui.css`. This predates this change and is out of its scope.
It does not weaken the Inter fix: the webfont request is also emitted into
`dist/assets/base2.css`, which any Typography import pulls in, so consumers get
Inter through normal component imports either way.
