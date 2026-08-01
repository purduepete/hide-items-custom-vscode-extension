const vscode = require("vscode");
const fs = require("fs");
const { marked } = require("marked");

const util = require("./util");

/**
 * Render a markdown document from the extension root as HTML. A missing or
 * unreadable document renders as an empty string so the welcome pane always
 * opens.
 * @param {string} file Markdown file name, relative to the extension root
 * @returns {string} Rendered HTML, or an empty string on failure
 */
function renderDoc(file) {
  try {
    return marked(fs.readFileSync(util.getRootPath(file), "utf8"));
  } catch (error) {
    util.logger(`Unable to render ${file} in the welcome pane`, "warn");
    return "";
  }
}

class WelcomePane {
  constructor() {}

  show() {
    fs.readFile(util.getResourcePath("welcome.html"), function (error, html) {
      if (error) {
        util.logger("Unable to load the welcome pane template", "warn");
        return;
      }

      const panel = vscode.window.createWebviewPanel(
        "explorerExclude",
        "welcome",
        vscode.ViewColumn.One,
        {}
      );

      // Replacements are passed as functions so that "$" sequences in the
      // rendered markdown are not treated as replacement patterns.
      const welcomePage = html
        .toString()
        .replace("{{README}}", () => renderDoc("README.md"))
        .replace("{{CHANGELOG}}", () => renderDoc("CHANGELOG.md"))
        .replace("{{TROUBLESHOOTING}}", () => renderDoc("TROUBLESHOOTING.md"));

      panel.title = "Explorer Exclude Welcome";
      panel.webview.html = welcomePage;
    });
  }
}

module.exports = WelcomePane;
