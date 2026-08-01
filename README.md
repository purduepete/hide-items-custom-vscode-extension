# Hide Items Custom

> A VS Code extension that hides files & folders from the Explorer via a right-click menu, plus a dedicated **Hidden Items** pane to manage and toggle them.

[![Marketplace](https://img.shields.io/visual-studio-marketplace/v/lerxst.hide-items-custom?label=marketplace)](https://marketplace.visualstudio.com/items?itemName=lerxst.hide-items-custom)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/lerxst.hide-items-custom)](https://marketplace.visualstudio.com/items?itemName=lerxst.hide-items-custom)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.txt)

VS Code can already hide things through the `files.exclude` setting, but editing that JSON by hand is tedious. **Hide Items Custom** turns it into a two-click operation: right-click anything in the Explorer, pick a pattern, and it's gone. A **Hidden Items** pane then lists every rule so you can toggle, remove, or reset them without ever opening `settings.json`.

## Features

- **Right-click to hide** — "Add to Hidden Items ..." on any file or folder in the Explorer.
- **Smart pattern picker** — instead of hiding just the one file, choose from generated glob patterns (this exact file, this filename anywhere, all files of this extension, everything in this folder, ...). Multi-select is supported.
- **Hidden Items pane** — a new section in the Explorer sidebar listing every rule, with per-rule visibility toggles.
- **Peek without losing your rules** — one click reveals everything temporarily, another click hides it all again. Your rule list is preserved.
- **Workspace-scoped** — all changes are written to the workspace's `.vscode/settings.json`, so they travel with the project and never touch your user settings.

## Installation

Install from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=lerxst.hide-items-custom), or from the Command Palette:

```
ext install lerxst.hide-items-custom
```

Or from the command line:

```sh
code --install-extension lerxst.hide-items-custom
```

## Usage

### Hiding an item

1. Right-click a file or folder in the Explorer.
2. Choose **Add to Hidden Items ...**.
3. Select one or more glob patterns from the picker and confirm.

For a file at `src/components/Button.test.ts`, the picker offers patterns along these lines:

| Pattern | Hides |
| --- | --- |
| `src/components/Button.test.ts` | just this one file |
| `**/Button.test.ts` | that filename, anywhere in the workspace |
| `src/components/*.ts` | all `.ts` files in that folder |
| `src/components/*.*` | everything in that folder |
| `**/*.ts` | every `.ts` file in the workspace |

Prefer to skip the prompt? Set `explorerExclude.showPicker` to `false` and the item you clicked is hidden immediately, with no picker.

### Managing hidden items

The **Hidden Items** pane appears in the Explorer sidebar. Click any row to toggle that single rule on or off, or right-click it and choose **Remove from Hidden Items** to delete it outright.

The pane's title bar has these actions:

| Action | What it does |
| --- | --- |
| **Enable All** | Turns every rule on. |
| **Disable All** | Turns every rule off, leaving the rules in place. |
| **Toggle Visibility** | Temporarily reveals everything, backing up your current state; click again to restore it exactly. |
| **Reset Hidden Items** | Clears your rules and restores the VS Code defaults (`**/.git`, `**/.svn`, `**/.hg`, `**/CVS`, `**/.DS_Store`, `**/Thumbs.db`, `**/*.git`). |
| **Update Extension Settings** | Opens the extension's settings. |

**Toggle Visibility** is the one to reach for day to day — unlike *Disable All*, it snapshots your rules first, so flipping it back restores precisely what you had.

> The seven default VS Code patterns are protected: they can be toggled, but not removed.

## Commands

All commands are available from the Command Palette under the **ExplorerExclude** category.

| Command | ID |
| --- | --- |
| Add to Hidden Items ... | `hide-items-custom.exclude` |
| Remove from Hidden Items | `hide-items-custom.remove` |
| Toggle Visibility | `hide-items-custom.toggle` |
| Enable All | `hide-items-custom.enableAll` |
| Disable All | `hide-items-custom.disableAll` |
| Reset Hidden Items | `hide-items-custom.reset` |
| Update Extension Settings | `hide-items-custom.openSettings` |

## Settings

| Setting | Type | Default | Description |
| --- | --- | --- | --- |
| `explorerExclude.showPicker` | `boolean` | `true` | Show the glob-pattern picker when hiding an item. When `false`, the exact item you clicked is hidden with no prompt. |
| `explorerExclude.backup` | `object` | `{}` | Managed automatically. Holds the snapshot of `files.exclude` taken by **Toggle Visibility** so it can be restored. Don't edit this by hand. |

## How it works

There's no hidden state and no proprietary format — the extension is a front end for VS Code's own `files.exclude` setting, written at **Workspace** scope (`.vscode/settings.json`):

```jsonc
{
  "files.exclude": {
    "**/.git": true,
    "node_modules": true,
    "**/*.log": false      // rule kept, currently toggled off
  }
}
```

`true` means hidden, `false` means the rule exists but is inactive. Because it's plain `files.exclude`, anything you hide is also excluded from Quick Open and search, and you can commit `.vscode/settings.json` to share the setup with your team.

## Requirements

- VS Code `1.60.0` or newer
- An open folder or workspace (rules are workspace-scoped, so there's nowhere to save them otherwise)

## Troubleshooting

**`util.isNullOrUndefined is not a function` when hiding an item**
Fixed in **v1.0.3**. Node 22 — which ships inside current VS Code builds — removed that long-deprecated API. Update the extension and reload the window.

**Nothing happens when I hide something**
Confirm you have a folder or workspace open, then check `.vscode/settings.json` for a `files.exclude` entry. Detailed logs are in the **Output** panel under the extension's channel.

**My rules disappeared**
Look at `explorerExclude.backup` in `.vscode/settings.json`. If it's non-empty, **Toggle Visibility** is active — click it again to restore your rules.

## Contributing

Issues and pull requests are welcome at [purduepete/hide-items-custom-vscode-extension](https://github.com/purduepete/hide-items-custom-vscode-extension).

```sh
git clone https://github.com/purduepete/hide-items-custom-vscode-extension.git
cd hide-items-custom-vscode-extension
npm install
npm test          # lint
npm run package   # build the .vsix
```

Press <kbd>F5</kbd> in VS Code to launch an Extension Development Host with the extension loaded.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Credits

Based on [Explorer Exclude](https://github.com/sfccdevops) by SFCC DevOps, used under the MIT License.

## License

[MIT](LICENSE.txt)
