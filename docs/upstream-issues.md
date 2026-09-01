# Upstream issues

`report-upstream` findings per `.buildwright/framework/findings.md`: issues better
fixed at their source than patched locally. Tick an item and move it out once the
upstream fix lands and the local workaround is replaced.

## [ ] `component.button.height` has no 40px step

-   Symptom: the approved `ActionSheet.Header` design specifies a 40px control, but
    `@deriv-com/quill-tokens@2.0.13` maps `component.button.height` to
    `sm → core.size.1200 (24px)`, `md → 1600 (32px)`, `lg → 2400 (48px)`,
    `xl → 3200 (64px)`. There is no step at 40px, even though `core.size.2000`
    is 40px.
-   Context: `lib/components/ActionSheet/header/header.scss` -
    `.quill-action-sheet--title--action-button__size--default` and
    `.quill-action-sheet--title--action` both reach past the component layer to
    `--core-size-2000` because no semantic component token expresses the value.
    See `openspec/changes/action-sheet-control-size-font-do-not-match-1/design.md`
    decision 1.
-   Upstream fix: add a 40px step to `component.button.height` / `width` in
    `@deriv-com/quill-tokens`. Once it ships, both declarations can reference the
    component token instead of the core one.

## [ ] `core.fontFamily` has no `inter` entry

-   Symptom: the approved design renders the action sheet title in Inter, but
    `core.fontFamily` in `@deriv-com/quill-tokens@2.0.13` contains only `ubuntu`,
    `ibmPlex.sans`, `ibmPlex.mono` and the `fontAwesome.*` families, so there is no
    token for Inter.
-   Context: `lib/components/ActionSheet/header/header.scss` -
    `.quill-action-sheet--title-text.quill-typography__h5` hard-codes the string
    `"Inter"`, and `lib/styles/index.scss` requests the webfont directly. See
    `openspec/changes/action-sheet-control-size-font-do-not-match-1/design.md`
    decisions 3 and 4.
-   Upstream fix: add `core.fontFamily.inter` to `@deriv-com/quill-tokens`, and
    decide there whether the heading scale should resolve to it. Once it ships, the
    literal can be replaced by `var(--core-fontFamily-inter)`.
