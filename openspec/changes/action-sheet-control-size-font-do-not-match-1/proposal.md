## Why

`ActionSheet.Header`'s close (✕) and save (✓) controls render at 32px and the sheet title renders in Ubuntu, neither of which matches the approved design (40px controls, Inter title) — reported downstream as [derivatives-trader#1298](https://github.com/deriv-com/derivatives-trader/issues/1298). Both defects originate in this library, not in the consumer: the actions default to `IconButton size="md"` → `--component-button-height-md` (32px, `lib/components/Button/button.scss:12-17`) and the title is `Heading.H5` → `--semantic-typography-heading-h5-fontFamily` → Ubuntu (`lib/components/Typography/typography.scss:109-123`). Neither is reachable through a prop, so every consumer would otherwise have to ship the same local stylesheet override.

## What Changes

- **Header action controls render at 40px by default.** The close/save icon buttons get a 40px box driven by `--core-size-2000`, scoped to `ActionSheet.Header` so the global button scale (sm 24 / md 32 / lg 48 / xl 64) is untouched.
- **`HeaderActionType.size` becomes an explicit opt-out, not the source of the default.** Omitting `size` yields the 40px design default; passing `size` keeps the existing base-scale behaviour for consumers that need it. Not breaking — no currently-valid prop value changes meaning.
- **The empty action slot matches the 40px control.** `.quill-action-sheet--title--action` reserves `--core-size-2000` instead of `--component-button-width-md`, so a single-action header stays optically centred.
- **The sheet title renders in Inter.** `.quill-action-sheet--title-text` overrides the Ubuntu heading family; the Inter webfont is requested at weight 700 (the only weight `Heading.H5` uses) alongside the existing Ubuntu / IBM Plex requests in `lib/styles/index.scss`.
- **Scope stays on the title.** Non-title sheet text (labels, values, chips, helper line, footer) keeps its current family — see Open Questions in `tasks.md`.
- **Storybook `argTypes` prose for `closeAction` / `saveAction` is corrected** in all three ActionSheet story files, which currently document "`size` (default `md`)".

## Capabilities

### New Capabilities

- `action-sheet-header`: the presentation contract for `ActionSheet.Header` — the size and default glyphs of the close/save controls, the reserved slot that keeps the title centred, the title's type family, and the webfonts the library stylesheet must request for it.

### Modified Capabilities

None — `openspec/specs/` is currently empty, so `action-sheet-header` is the first capability in this repo.

## Impact

- `lib/components/ActionSheet/header/header.scss` — 40px control box, 40px reserved slot, Inter title family.
- `lib/components/ActionSheet/header/index.tsx` — apply the default-size modifier class only when the consumer omits `size`.
- `lib/components/ActionSheet/types.ts` — `HeaderActionType.size` doc comment (the type itself, `TRegularSizesWithExtraLarge`, is unchanged).
- `lib/styles/index.scss` — add the Inter webfont request. Ships to every consumer that imports `@deriv-com/quill-ui/styles`, and to anything importing a Typography component (`lib/components/Typography/base.tsx:3` imports this stylesheet).
- `lib/components/ActionSheet/header/__tests__/header.test.tsx` — coverage for the default-size modifier class.
- `lib/components/ActionSheet/{button-trigger,controlled,icon-trigger}.stories.tsx` — corrected `argTypes` descriptions.
- **Design tokens are not touched.** `@deriv-com/quill-tokens@2.0.13` has no 40px `component.button.height` step and no `core.fontFamily.inter`; `data/tokens.json` is the local generator input, not the shipped source (the runtime variables come from `@deriv-com/quill-tokens/dist/quill.css`). Both gaps are recorded as `report-upstream` findings per `.buildwright/framework/findings.md`.
- **Downstream:** once released, derivatives-trader needs no local override and no extra Google Fonts entry in `packages/core/src/index.html` — it only needs the version bump. Verified there, not here.
- No public TypeScript signature changes, so no consumer code change is required.
