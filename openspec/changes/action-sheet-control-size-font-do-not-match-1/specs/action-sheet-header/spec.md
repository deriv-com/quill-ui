## Purpose

Defines the presentation contract for the `ActionSheet.Header` title row: the size and default glyphs of its close/save controls, the slot that keeps the title optically centred, the type family the title renders in, and the webfonts the library stylesheet must request so that family resolves. Consumers rely on this so the approved mobile bottom-sheet design is reached without a local stylesheet override.

## ADDED Requirements

### Requirement: Header action controls render at the design size by default

The close and save controls in the header title row SHALL render as a 40px × 40px box when the consumer does not specify a size, sourced from the design system's 40px size token rather than a hard-coded pixel value. This default SHALL be scoped to the action sheet header: the library's shared button size scale (24 / 32 / 48 / 64) SHALL be unchanged, and no button outside `ActionSheet.Header` SHALL change size as a result.

#### Scenario: Consumer omits the control size

- **WHEN** a header is rendered with `closeAction` and/or `saveAction` and neither specifies a size
- **THEN** each rendered control occupies a 40px × 40px box
- **AND** the box is driven by the design system's 40px size token

#### Scenario: Buttons elsewhere are unaffected

- **WHEN** an icon button is rendered outside `ActionSheet.Header` at any supported size
- **THEN** its box is the shared scale's value for that size (24 / 32 / 48 / 64px), unchanged by this capability

### Requirement: An explicit size overrides the header default

A consumer SHALL be able to opt a header action out of the 40px default by specifying a size, in which case the control SHALL render at the shared button scale's value for that size. Supplying a size SHALL remain optional, and the set of accepted size values SHALL be unchanged.

#### Scenario: Consumer specifies a size

- **WHEN** a header action specifies the large size
- **THEN** the control renders at the shared scale's large box (48px), not 40px

#### Scenario: Size is still optional

- **WHEN** a header action is supplied as an empty object
- **THEN** the control renders and no size-related error or warning is raised

### Requirement: The reserved action slot matches the default control

Each side of the title row SHALL reserve at least the width of a default-size control, including the side whose action was not supplied, so the title stays optically centred whether one or both actions are present.

#### Scenario: Only one action is supplied

- **WHEN** a header is rendered with `saveAction` but no `closeAction`
- **THEN** the leading slot is still rendered, is empty, and reserves at least 40px of width

#### Scenario: Neither action is supplied

- **WHEN** a header is rendered with neither `closeAction` nor `saveAction`
- **THEN** no action control and no reserved slot are rendered

### Requirement: The sheet title renders in Inter

The action sheet title SHALL render in the Inter type family, overriding the family the shared heading style resolves to. The override SHALL apply only to the title: the header description and all other sheet text (content labels, values, chips, helper/error line, footer) SHALL keep the family they render in today. The title's size, weight, line height and colour SHALL be unchanged.

#### Scenario: Title family

- **WHEN** a header is rendered with a title
- **THEN** the title's computed font family resolves to Inter, with the body sans-serif stack as fallback

#### Scenario: Non-title sheet text is untouched

- **WHEN** a header is rendered with both a title and a description
- **THEN** the description's computed font family is unchanged from its current value

#### Scenario: Title metrics are untouched

- **WHEN** a header is rendered with a title
- **THEN** its font size, font weight, line height and colour match the shared heading style used before this change

### Requirement: The library stylesheet requests every webfont its components render in

The library's global stylesheet SHALL request each webfont family its components depend on, at each weight those components use, so a consumer that imports the library stylesheet needs no additional font declaration of its own. Inter SHALL be requested at the weight the title renders at (bold / 700).

#### Scenario: Consumer imports only the library stylesheet

- **WHEN** an application imports the library's stylesheet and renders an action sheet header with a title, declaring no fonts itself
- **THEN** the title renders in Inter rather than a substituted family

#### Scenario: Existing font requests are preserved

- **WHEN** the library stylesheet is loaded
- **THEN** the Ubuntu and IBM Plex Sans / Mono requests that existed before this change are still made
