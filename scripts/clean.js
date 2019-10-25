const { deleteWorkDir, INSTALL_DIR, rmdirAsync } = require("./common");


deleteWorkDir();
if(process.argv[2] === "--libraries"){
  Promise.resolve(rmdirAsync(INSTALL_DIR).catch(()=>{}))
}