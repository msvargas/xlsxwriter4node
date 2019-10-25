const {
  spawnSync,
  OS,
  fs,
  path,
  mkdirLibraries,
  BUILD_DIR,
  WORK_DIR,
  zlibRepository,
  rmdirAsync,
  INSTALL_DIR
} = require("./common");

if (!!process.env.FORCE_DOWNLOAD || process.argv[2] === "--FORCE_DOWNLOAD") {
  console.log("FORCE_DOWNLOAD ZLIB");
  const dir1 = path.resolve(BUILD_DIR.zlib, "..");
  const dir2 = path.resolve(INSTALL_DIR, "zlib");
  Promise.all([
    Promise.resolve(
      rmdirAsync(dir1).catch(e =>
        console.error("[ERROR xlsxwriter build-zlib]", e)
      )
    ),
    Promise.resolve(
      rmdirAsync(dir2).catch(e =>
        console.error("[ERROR xlsxwriter build-zlib]", e)
      )
    )
  ]).then(buildZlib);
} else {
  buildZlib();
}

function buildZlib() {
  const INSTALL_DIR_ZLIB = path.resolve(INSTALL_DIR, "zlib");

  mkdirLibraries();
  console.log("Build zlib...");
  try {
    spawnSync(`cd ${WORK_DIR}&& git clone ${zlibRepository}`, {
      stdio: "inherit",
      shell: true
    });
  } catch (error) {}

  fs.mkdirSync(BUILD_DIR.zlib, { recursive: true });
  fs.mkdirSync(INSTALL_DIR_ZLIB, { recursive: true });
  process.env.DEST_DIR = INSTALL_DIR_ZLIB;
  const CMD = `cd ${BUILD_DIR.zlib}&& cmake .. ${
    OS === "win32" ? `-G "Visual Studio 15 Win64"` : ""
  } ${
    OS === "win32"
      ? `-DCMAKE_INSTALL_PREFIX:PATH="${INSTALL_DIR_ZLIB}"`
      : `-DCMAKE_INSTALL_PREFIX=${path.relative(
          BUILD_DIR.zlib,
          INSTALL_DIR_ZLIB
        )}`
  } &&  cmake --build . --config Release --target install`;
  console.info(CMD);
  spawnSync(CMD, {
    shell: true,
    stdio: "inherit",
    env: process.env
  });
}
