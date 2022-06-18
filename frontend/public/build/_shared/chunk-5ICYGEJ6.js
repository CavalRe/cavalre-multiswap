import {
  __toESM,
  init_react,
  require_react
} from "/build/_shared/chunk-6CGL4AQG.js";

// node_modules/@react-dnd/invariant/dist/esm/index.mjs
init_react();
function invariant(condition, format, ...args) {
  if (isProduction()) {
    if (format === void 0) {
      throw new Error("invariant requires an error message argument");
    }
  }
  if (!condition) {
    let error;
    if (format === void 0) {
      error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    } else {
      let argIndex = 0;
      error = new Error(format.replace(/%s/g, function() {
        return args[argIndex++];
      }));
      error.name = "Invariant Violation";
    }
    error.framesToPop = 1;
    throw error;
  }
}
function isProduction() {
  return typeof process !== "undefined" && process.env["NODE_ENV"] === "production";
}

// node_modules/react-dnd/dist/esm/core/DndContext.mjs
init_react();
var import_react = __toESM(require_react(), 1);
var DndContext = (0, import_react.createContext)({
  dragDropManager: void 0
});

export {
  invariant,
  DndContext
};
//# sourceMappingURL=/build/_shared/chunk-5ICYGEJ6.js.map
