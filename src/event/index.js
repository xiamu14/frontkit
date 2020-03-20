const { ipcMain, dialog } = require("electron");

module.exports = function event() {
  // 选择目录/文件
  ipcMain.on("open-directory-dialog", (event, arg) => {
    // console.log(arg); // prints "ping"
    const directory = dialog.showOpenDialogSync({
        properties: arg
      })
    // console.log('查看一下路径', directory);
    event.reply("selected-directory", directory);
  });
  // 动态导入模块测试
  ipcMain.on("import-dynamic", (event, arg) => {
    // console.log('动态导入模块执行了吗');
    const test = require('./dynamic-test.js')
    test();
  })
};
