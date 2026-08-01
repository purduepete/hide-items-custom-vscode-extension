# Change Log

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
