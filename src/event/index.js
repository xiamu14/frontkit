const { ipcMain, dialog } = require("electron");

module.exports = function event() {
  // 选择目录/文件
  ipcMain.on("open-directory-dialog", (event, arg) => {
    console.log(arg); // prints "ping"
    const directory = dialog.showOpenDialogSync({
        properties: arg
      })
    console.log('查看一下路径', directory);
    event.reply("selected-directory", directory);
  });
};
