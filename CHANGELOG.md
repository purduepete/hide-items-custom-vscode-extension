# Change Log

## v1.0.6

-   Replace the marketplace version and installs badges. shields.io retired its
    `visual-studio-marketplace` badge family, and because the retired badges still return
    HTTP 200 they rendered the literal text "retired badge" on the listing instead of
    failing visibly.

## v1.0.5

-   Fix the Welcome pane, which opened as a blank tab on every install and upgrade. It
    failed twice over: `marked` v4 exports an object rather than a callable, so
    `marked(...)` threw, and it also read a `TROUBLESHOOTING.md` that was never shipped.
-   Add the missing `TROUBLESHOOTING.md`, so the Welcome pane's third section has content.
-   Rewrite the `explorerExclude.backup` setting description in all 14 languages. Every
    locale carried the same text copied from an unrelated extension, describing an
    "empty last line" option that does not exist here.
-   Drop dead activation events, including `onView:extension` (no such view) and nine
    `onCommand:` entries made redundant by `onStartupFinished`.
-   Add a `.prettierrc` so the checked-in formatting is stable.

## v1.0.4

-   Fix hiding on Windows. Generated glob patterns used the platform path separator, so
    every pattern containing a folder (`src\components\*.ts`) silently failed to match —
    `\` is an escape character in a glob, not a separator. Patterns are now always built
    with `/`. Only bare filename patterns worked before.
-   Remove the unused `util` import left over from the v1.0.3 fix.
-   Add an ESLint config so `npm test` runs, and expand the README.

## v1.0.3

-   Fix `util.isNullOrUndefined is not a function` when hiding an item. The Node API was
    removed in Node 22, which ships with current VS Code builds.
-   Drop the stale `engines.node` pin.

## v1.0.2

-   Name changing

## v1.0.1

-   Misc artifact cleanup

## v1.0.0

-   Initial Release
