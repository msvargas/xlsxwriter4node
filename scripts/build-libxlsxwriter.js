const {
  spawnSync,
  OS,
  fs,
  path,
  INSTALL_DIR,
  BUILD_DIR,
  WORK_DIR,
  libxlsxwirterRepository,
  mkdirLibraries
} = require("./common");

if (!!process.env.FORCE_DOWNLOAD || process.argv[2] === "--FORCE_DOWNLOAD") {
  console.log("FORCE_DOWNLOAD LIBXLSXWRITER");
  const dir1 = path.resolve(BUILD_DIR.libxlsxwriter, "..");
  const dir2 = path.resolve(INSTALL_DIR, "libxlsxwriter");
  Promise.all([
    Promise.resolve(
      rmdirAsync(dir1).catch(e =>
        console.error("[ERROR xlsxwriter build-libxlsxwriter]", e)
      )
    ),
    Promise.resolve(
      rmdirAsync(dir2).catch(e =>
        console.error("[ERROR xlsxwriter build-libxlsxwriter]", e)
      )
    )
  ]).then(buildLibXlsxWriter);
} else {
  libxlsxwriter();
}

function libxlsxwriter() {
  mkdirLibraries();
  try {
    spawnSync(`cd ${WORK_DIR}&& git clone ${libxlsxwirterRepository}`, {
      stdio: "inherit",
      shell: true
    });
  } catch (error) {}
  const INSTALL_DIR_LIBXLSXWRITTER = `${INSTALL_DIR}/libxlsxwriter`;
  fs.mkdirSync(BUILD_DIR.libxlsxwriter, { recursive: true });
  fs.mkdirSync(INSTALL_DIR_LIBXLSXWRITTER, { recursive: true });
  process.env.DEST_DIR = INSTALL_DIR_LIBXLSXWRITTER;
  const CMD = `cd ${BUILD_DIR.libxlsxwriter}&&cmake .. ${
    OS === "win32" ? `-G "Visual Studio 15 Win64"` : ""
  } ${
    OS === "win32"
      ? `-DCMAKE_INSTALL_PREFIX:PATH="${INSTALL_DIR_LIBXLSXWRITTER}"`
      : `-DCMAKE_INSTALL_PREFIX=${path.relative(
          BUILD_DIR.libxlsxwriter,
          INSTALL_DIR_LIBXLSXWRITTER
        )}`
  } -DZLIB_ROOT:STRING="${INSTALL_DIR}/zlib"&&cmake --build . --config Release --target install`;
  console.log(CMD);
  spawnSync(CMD, {
    shell: true,
    stdio: "inherit",
    env: process.env
  });
}
