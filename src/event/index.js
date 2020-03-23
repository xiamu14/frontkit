const { ipcMain, dialog } = require("electron");
const db  = require('../helper/lowdb');
const Builder = require('../builder');

module.exports = function event() {
  // 选择目录/文件
  ipcMain.on("open-directory-dialog", (event, arg) => {
    const directory = dialog.showOpenDialogSync({
        properties: arg
      });
    event.reply("selected-directory", directory);
  });
  // 动态导入模块测试
//   ipcMain.on("import-dynamic", (event, arg) => {
//     // console.log('动态导入模块执行了吗');
//     const test = require('./dynamic-test.js');
//     test();
//   });

  // 保存生成器配置
  ipcMain.on("save-builder", (event, arg) => {
      db.get('builderConf').push(arg).write();
  });

  // 读取生成器配置文件
  ipcMain.on("read-builder", (event) => {
      const builder = db.get('builderConf').value();
      event.reply("read-builder", builder);
  });

  // 启动生成器
  ipcMain.on("build", (event, arg) => {
    const builder = new Builder(arg, event);
    builder.init();
  });
};
