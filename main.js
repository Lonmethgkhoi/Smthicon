class VSCodeHintIconsAdvanced {
  constructor() {
    this.id = "acode.vscode.hinticons.advanced";
    this.name = "VSCode Hint Icons Advanced";
  }

  async init() {
    // Import Codicons CSS
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "https://cdn.jsdelivr.net/npm/@vscode/codicons/dist/codicon.css";
    document.head.appendChild(style);

    // Full mapping VS Code IntelliSense icons
    this.symbolMap = {
      text: "codicon codicon-symbol-string",
      method: "codicon codicon-symbol-method",
      function: "codicon codicon-symbol-function",
      constructor: "codicon codicon-symbol-constructor",
      field: "codicon codicon-symbol-field",
      variable: "codicon codicon-symbol-variable",
      class: "codicon codicon-symbol-class",
      interface: "codicon codicon-symbol-interface",
      module: "codicon codicon-symbol-module",
      property: "codicon codicon-symbol-property",
      unit: "codicon codicon-symbol-unit",
      value: "codicon codicon-symbol-value",
      enum: "codicon codicon-symbol-enum",
      keyword: "codicon codicon-symbol-keyword",
      snippet: "codicon codicon-symbol-snippet",
      color: "codicon codicon-symbol-color",
      file: "codicon codicon-symbol-file",
      reference: "codicon codicon-references",
      folder: "codicon codicon-folder",
      enumMember: "codicon codicon-symbol-enum-member",
      constant: "codicon codicon-symbol-constant",
      struct: "codicon codicon-symbol-structure",
      event: "codicon codicon-symbol-event",
      operator: "codicon codicon-symbol-operator",
      typeParameter: "codicon codicon-symbol-parameter",
      namespace: "codicon codicon-symbol-namespace",
      string: "codicon codicon-symbol-string",
      number: "codicon codicon-symbol-number",
      boolean: "codicon codicon-symbol-boolean",
      array: "codicon codicon-symbol-array",
      object: "codicon codicon-symbol-object",
      package: "codicon codicon-symbol-package",
      null: "codicon codicon-symbol-null",
      key: "codicon codicon-symbol-key",
      reference2: "codicon codicon-symbol-reference",
      operator2: "codicon codicon-symbol-operator",
      type: "codicon codicon-symbol-type-parameter"
    };

    this.patchAutocomplete();
  }

  determineType(text) {
    text = text.trim();

    if (text.match(/\(.*\)/)) return "function";
    if (/^class\s+/i.test(text) || /^[A-Z]/.test(text)) return "class";
    if (/^interface\s+/i.test(text)) return "interface";
    if (/^const\s+/i.test(text)) return "constant";
    if (/^let\s+/i.test(text) || /^var\s+/i.test(text)) return "variable";
    if (/^enum\s+/i.test(text)) return "enum";
    if (/^import\s+/i.test(text) || /^module\s+/i.test(text)) return "module";
    if (/^event\s+/i.test(text)) return "event";
    if (/^return\s+/i.test(text)) return "keyword";
    if (text.includes("=>")) return "method";
    if (text.match(/^\d+$/)) return "number";
    if (/true|false/.test(text)) return "boolean";
    if (/".*"|'.*'/i.test(text)) return "string";

    return "variable"; // mặc định
  }

  patchAutocomplete() {
    const observer = new MutationObserver(() => {
      document.querySelectorAll(".ace_autocomplete .ace_content .ace_line").forEach((el) => {
        if (!el.querySelector(".codicon")) {
          const text = el.textContent;
          const type = this.determineType(text);
          const iconClass = this.symbolMap[type] || this.symbolMap.variable;

          const icon = document.createElement("span");
          icon.className = iconClass;
          icon.style.marginRight = "6px";
          el.prepend(icon);
        }
      });
    });

    const target = document.body;
    observer.observe(target, { childList: true, subtree: true });
  }

  async destroy() {
    document.querySelectorAll(".codicon").forEach((i) => i.remove());
  }
}

if (window.acode) {
  acode.setPlugin(new VSCodeHintIconsAdvanced());
}
