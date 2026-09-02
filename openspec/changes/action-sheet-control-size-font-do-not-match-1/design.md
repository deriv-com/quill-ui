## Context

See `proposal.md` — Why. The constraints that shape the approach:

- **The 40px step does not exist in the token package.** `@deriv-com/quill-tokens@2.0.13` maps `component.button.height` to `sm → core.size.1200 (24px)`, `md → 1600 (32px)`, `lg → 2400 (48px)`, `xl → 3200 (64px)`. `core.size.2000` **is** 40px, so a 40px box is expressible from a core token without inventing a value.
- **Tokens cannot be changed from this repo.** `data/tokens.json` is the input to `scripts/transformer.js`, which writes to `lib/styles/quill/` (not committed); the CSS variables consumers actually get come from `@deriv-com/quill-tokens/dist/quill.css`, imported at `lib/styles/index.scss:2`. Editing `data/tokens.json` ships nothing.
- **There is no Inter token.** `core.fontFamily` is `ubuntu`, `ibmPlex.sans`, `ibmPlex.mono`, `fontAwesome.*` only.
- **`Heading.H5` styles the title through a single-class selector.** `.quill-typography__h5` (`lib/components/Typography/typography.scss:109-123`) sets `font-family` from `--semantic-typography-heading-h5-fontFamily`, which resolves to Ubuntu at bold/700.
- **`header.scss` already has an established override idiom.** Lines 60-61 comment it explicitly: chain the header's own class with `.quill-button` so the rule outweighs the base button styles. This change reuses that idiom rather than introducing `!important` or a new mechanism.
- **jsdom does not evaluate SCSS.** `moduleNameMapper` maps `\.(css|scss|…)$` to `identity-obj-proxy` (package.json jest config), so unit tests can assert *which classes are applied* but never a computed px or family. Pixel and font verification is visual, in Storybook.

## Goals / Non-Goals

**Goals:**

- Fix both defects at source so no consumer needs a local override.
- Keep the change scoped to `ActionSheet.Header` — nothing else in the library moves.
- Keep the public TypeScript surface unchanged (no consumer edits, no major bump).

**Non-Goals:**

- Adding a 40px step to the shared button scale or to `TGenericSizes`.
- Changing the heading typography tokens, or Ubuntu anywhere else in the library.
- The desktop-only `closeIcon` control (`lib/components/ActionSheet/header/index.tsx:158-169`), which is sized 48px by `.quill-action-sheet--title--icon` and is a separate element from `closeAction`/`saveAction`. The issue names the header actions; this stays as-is.
- Any edit in derivatives-trader. Downstream only needs the released version.

## Decisions

### 1. Scope 40px to the header, not to the global button scale

A header-local modifier class on the action button, `.quill-action-sheet--title--action-button__size--default`, sets `min-inline-size` / `min-block-size` to `var(--core-size-2000)`. Chained with `.quill-button` it is a two-class selector, so it beats the single-class `.quill-icon-button__size--md` (`lib/components/Button/button.scss:12-17`) regardless of stylesheet order — the same reasoning the file already documents at lines 60-61. Only `min-*` needs overriding because the icon-button size classes set nothing else dimensional, and `border-radius` is already forced to `pill` at line 63.

- *Alternative — add a 40px step to the shared scale (e.g. a new size name between `md` and `lg`).* Rejected: it needs a name that `TGenericSizes` has no slot for, has no backing `component.button.height` token so the value would be hard-coded into a public API step, and widens the blast radius to every `Button`/`IconButton` consumer for a single sheet's design. Violates YAGNI (`.buildwright/steering/philosophy.md`).
- *Alternative — leave it to consumers (the local override the issue describes).* Rejected: the ✕/✓ glyphs, colours and geometry are all owned by this component (`ACTION_DEFAULTS`, `header.scss`), so every consumer would re-implement the same override.

### 2. Gate the modifier on the consumer omitting `size`

`size` is destructured without a default and passed as `size={size ?? "md"}`; the modifier class is applied only when `size` is falsy. `"md"` is retained as the underlying base size so the button still receives border-width/radius classes, while `min-*` is overridden to 40px.

This keeps `HeaderActionType.size` meaningful as an escape hatch and makes the default externally observable in a jsdom test (the class is on the DOM node), which gives this change a real red→green step under `.buildwright/framework/tdd-evidence.md`.

- *Alternative — apply the 40px unconditionally.* Rejected: it would silently break any consumer passing `size`, since the two-class selector outweighs the size class they asked for.
- *Alternative — remove `size` from `HeaderActionType` (**BREAKING**).* Rejected: `size` shipped in `380333d`; removing it buys nothing the gate does not.

### 3. Set Inter on the title selector, chained with the typography class

`.quill-action-sheet--title-text.quill-typography__h5` sets `font-family: "Inter", var(--core-fontFamily-ibmPlex-sans), sans-serif`. Chaining is required: `.quill-action-sheet--title-text` alone is also a single class, so it would tie with `.quill-typography__h5` and the winner would depend on bundle order — `lib/components/Typography/base.tsx:3` imports `@styles/index.scss` and `./typography.scss`, and `header.scss` is imported separately by the header module, so that order is not something this repo controls. Only `font-family` is declared; size, weight, line-height and colour keep coming from the heading token.

The family name is written as a literal, with a comment pointing at the missing token, rather than introducing a new global CSS variable for one use site. `--core-fontFamily-ibmPlex-sans` as the second entry follows the existing precedent (`lib/components/Input/textarea/textarea.scss:14`, `lib/components/Atom/Calendar/date-picker.scss:88`).

### 4. Request Inter from `lib/styles/index.scss`, at weight 700 only

A fourth `@import url("https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap")` joins the existing three inside the `@at-root` block (lines 5-9). Weight 700 only, mirroring the Ubuntu line, because `semantic.typography.heading.h5.fontWeight` is `core.fontWeight.bold` (700) — that is the single weight the title renders at, and requesting unused weights costs consumers bytes.

Because `base.tsx` imports this stylesheet, the request ships with any Typography usage as well as via the `@deriv-com/quill-ui/styles` entry point — so downstream needs no `index.html` change.

- *Alternative — self-host the woff2.* Rejected: the repo has no font assets and no pipeline for them; all three existing families come from Google Fonts.
- *Alternative — leave the request to consumers.* Rejected: it makes the fix silently incomplete — the title falls back to IBM Plex Sans with no error.

### 5. Record both token gaps upstream instead of working around them permanently

Per `.buildwright/framework/findings.md`, the missing 40px `component.button.height` step and the missing `core.fontFamily.inter` are `report-upstream` findings against `@deriv-com/quill-tokens`. Both local workarounds are then replaceable by a token reference in a later change.

## Risks / Trade-offs

- **A consumer passing `size` now gets a different box than the header's default (40px vs 24/32/48/64).** → Intended, and the only way to keep the prop honest. Documented in the `HeaderActionType.size` JSDoc and in the three stories' `argTypes` prose, which currently says "default `md`".
- **Two selectors now depend on specificity rather than order.** → Both are two-class selectors beating one-class base rules, which cannot be flipped by import order; the idiom and the reason are commented in `header.scss` at each site.
- **The 40px value is a `--core-size-2000` reference, not a semantic component token.** → Accepted for now; carried as the `report-upstream` finding in decision 5, and confined to two declarations in one file.
- **jsdom cannot prove either visual outcome.** → The class-application behaviour is unit-tested red→green; the 40px box, the pill radius, and Inter rendering are verified in Storybook at mobile width, in light and dark themes, and that verification is stated as manual in the PR body rather than implied by a green suite.
- **Inter is a fourth blocking Google Fonts request.** → `display=swap` and a single weight keep the cost to one small request; it is loaded from the same origin already used for the other three, so no new DNS/TLS handshake.
- **A consumer with a Content-Security-Policy that blocks `fonts.googleapis.com` sees the fallback.** → Pre-existing for Ubuntu and IBM Plex; the fallback chain ends in `sans-serif`, so text always renders.
- **Title row headroom shrinks.** → The row is `--core-size-2400` (48px, `header.scss:27`); a 40px control leaves 4px each side and the `align-items: center` rule already handles it. Confirmed visually as part of the Storybook check.
