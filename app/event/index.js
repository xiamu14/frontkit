const { ipcMain, dialog } = require("electron");
const shortid = require("shortid");
const db = require("../helper/lowdb");
const Builder = require("../builder");

module.exports = function event() {
    // 选择目录/文件
    ipcMain.on("open-directory-dialog", (event, arg) => {
        const directory = dialog.showOpenDialogSync({
            properties: arg
        });
        event.reply("selected-directory", directory);
    });

    // 保存生成器配置
    ipcMain.on("save-builder", (event, arg) => {
        const conf = Object.assign({}, { id: shortid.generate() }, arg);
        db.get("builderConf")
            .push(conf)
            .write();
    });
    // 删除生成器配置
    ipcMain.on("del-builder", (event, arg) => {
        db.get("builderConf")
            .remove({ id: arg })
            .write();
        const builder = db.get("builderConf").value();
        event.reply("read-builder", builder);
    });
    // 更新生成器配置
    ipcMain.on("update-builder", (event, arg) => {
        db.get("builderConf")
            .find({ id: arg.id })
            .assign(arg.conf)
            .write();
        const builder = db.get("builderConf").value();
        event.reply("read-builder", builder);
    });
    // 读取生成器配置文件
    ipcMain.on("read-builder", (event, arg) => {
        let builder = [];
        if (arg) {
            builder = db
                .get("builderConf")
                .find(arg)
                .value();
        } else {
            builder = db.get("builderConf").value();
        }
        event.reply("read-builder", builder);
    });

    // 启动生成器
    ipcMain.on("build", (event, arg) => {
        const builder = new Builder(arg, event);
        builder.init();
    });
};
