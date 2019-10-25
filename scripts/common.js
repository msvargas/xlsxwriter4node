const path = require("path");
const fs = require("fs");
const os = require("os");
const util = require("util");
const spawnSync = require("child_process").spawnSync;

const OS = os.platform();
const WORK_DIR = path.resolve(__dirname, "..", "temp");
const INSTALL_DIR = path.resolve(__dirname, "..", "third_party");
const BUILD_DIR = {
  zlib: path.resolve(WORK_DIR, "zlib", "build"),
  libxlsxwriter: path.resolve(WORK_DIR, "libxlsxwriter", "build")
};
const zlibRepository =  "https://github.com/madler/zlib.git";
const libxlsxwirterRepository =
  "https://github.com/jmcnamara/libxlsxwriter.git";

process.env.WORK_DIR = WORK_DIR;
process.env.INSTALL_DIR = INSTALL_DIR;

function mkdirLibraries() {
  try {
    fs.mkdirSync(WORK_DIR, { recursive: true });
    fs.mkdirSync(INSTALL_DIR, { recursive: true });
  } catch (error) {
    
  }

}
var rmdirAsync = util.promisify(function(path, callback) {
  fs.readdir(path, function(err, files) {
    if (err) {
      // Pass the error on to callback
      callback(err, []);
      return;
    }
    var wait = files.length,
      count = 0,
      folderDone = function(err) {
        count++;
        // If we cleaned out all the files, continue
        if (count >= wait || err) {
          fs.rmdir(path, callback);
        }
      };
    // Empty directory to bail early
    if (!wait) {
      folderDone();
      return;
    }

    // Remove one or more trailing slash to keep from doubling up
    path = path.replace(/\/+$/, "");
    files.forEach(function(file) {
      var curPath = path + "/" + file;
      fs.lstat(curPath, function(err, stats) {
        if (err) {
          callback(err, []);
          return;
        }
        if (stats.isDirectory()) {
          rmdirAsync(curPath, folderDone);
        } else {
          fs.unlink(curPath, folderDone);
        }
      });
    });
  });
});

const deleteWorkDir = () => {
  return rmdirAsync(WORK_DIR)
    .then(() => {
      console.log("build clean successful! xlsxwriter4node");
    })
    .catch(e =>{});
};
module.exports = {
  OS,
  WORK_DIR,
  INSTALL_DIR,
  BUILD_DIR,
  zlibRepository,
  libxlsxwirterRepository,
  path,
  fs,
  spawnSync,
  mkdirLibraries,
  deleteWorkDir,
  rmdirAsync
};
