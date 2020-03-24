const path = require("path");
const fs = require("fs");
const getStat = require("../util/get-stat");
const readDir = require("../util/read-dir");
const wait = require("../util/wait");

// 生成器函数
module.exports = class Builder {
    constructor(buildConf, ctx) {
        this.buildConf = buildConf;
        this.ctx = ctx;
    }

    // 初始化函数
    async init() {
        // console.log("检查下参数", this.buildConf.id, this.buildConf.conf);
        let files = null;
        let start = Date.now();
        const minDuration = 1500;
        try {
            this.ctx.reply('onBuild', {current:0, status: "process", log: ''});
            files = await this.readData();
            const stop = Date.now();
            const duration = stop - start;
            if (duration < minDuration) {
                await wait(minDuration - duration);
            }
            this.ctx.reply('onBuild', {current: 0, status: "finish", log: JSON.stringify(files)});
            start = Date.now();
        } catch (error) {
            console.log(error);
        }

        await wait(500);
        let data = null;
        try {
            this.ctx.reply('onBuild', {current:1, status: "finish", log: ''});
            data = await this.parseData(files);
            const stop = Date.now();
            const duration = stop - start;
            if (duration < minDuration) {
                await wait(minDuration - duration);
            }
            this.ctx.reply('onBuild', {current: 1, status: "finish", log: JSON.stringify(data)});
        } catch (error) {
            console.log(error);
        }

        await wait(500);
        const codeArr = this.seedTemplate(data);
        this.ctx.reply('onBuild', {current: 2, status: "process", log: JSON.stringify(codeArr)});

        await wait(500);
        this.createFile(codeArr);
        this.ctx.reply('onBuild', {current: 3, status: "finish", log: '构建完成'});

    }

    // 读取数据源
    async readData() {
        let stat = null;
        let files = null;
        const { conf } = this.buildConf;
        try {
            stat = await getStat(conf.dataPath);
        } catch (e) {
            throw new Error(e.toString());
        }
        if (stat && stat.isDirectory()) {
            files = await readDir(conf.dataPath);
        }
        return files;
    }
    // 解析数据
    async parseData(files) {
        const { conf } = this.buildConf;
        const { parse } = conf;
        let parser = null;
        if (parse.type !== "custom") {
            // 使用内置的解析器
            parser = require(path.resolve(
                __dirname,
                `../parser/${parse.type}.js`
            ));
        }

        return await parser(files);
    }

    // 投喂模板
    seedTemplate(data) {
        const { conf } = this.buildConf;
        const { templateList } = conf;
        const codeArr = [];
        for (let i = 0; i < templateList.length; i += 1) {
            const item = templateList[i];
            const tpl = require(item.templateFilePath);
            const codeStr = tpl(data);
            codeArr.push({
                codeStr,
                fileName: item.targetFileName
            });
        }
        // console.log("检查下生成的代码数组", codeArr);
        return codeArr;
    }

    // 根据模板字符串生成文件
    createFile(codeArr) {
        const { conf } = this.buildConf;
        const { targetPath } = conf;
        codeArr.forEach(element => {
            fs.writeFileSync(path.join(targetPath, element.fileName), element.codeStr);
        });
    }
};
