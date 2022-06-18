import {
  __esm,
  init_react
} from "/build/_shared/chunk-6CGL4AQG.js";

// node_modules/is-stream/index.js
function isStream(stream) {
  return stream !== null && typeof stream === "object" && typeof stream.pipe === "function";
}
function isWritableStream(stream) {
  return isStream(stream) && stream.writable !== false && typeof stream._write === "function" && typeof stream._writableState === "object";
}
function isReadableStream(stream) {
  return isStream(stream) && stream.readable !== false && typeof stream._read === "function" && typeof stream._readableState === "object";
}
function isDuplexStream(stream) {
  return isWritableStream(stream) && isReadableStream(stream);
}
var init_is_stream = __esm({
  "node_modules/is-stream/index.js"() {
    init_react();
  }
});

export {
  isDuplexStream,
  init_is_stream
};
//# sourceMappingURL=/build/_shared/chunk-CFL764PS.js.map
