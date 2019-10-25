const fs = require("fs");
const os = require("os");
const path = require("path");
try {
  const zlib = path.resolve(
    __dirname,
    "..",
    "third_party/zlib/lib/",
    os.platform() === "win32" ? "zlib.lib" : "libz.so"
  );
  const libxlsxwriter = path.resolve(
    __dirname,
    "..",
    "third_party",
    "libxlsxwriter",
    "lib",
    os.platform() === "win32" ? "x64/Release/xlsxwriter.lib" : "libxlsxwriter.a"
  );

  const compiled = fs.existsSync(zlib) && fs.existsSync(libxlsxwriter);
  //console.log(zlib,libxlsxwriter,compiled);
  if (compiled) return;

  require("./build-zlib");
  require("./build-libxlsxwriter");
  require("./clean");
} catch (error) {
  console.error(error);
}
