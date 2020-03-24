const path = require("path");
const fs = require("fs");
const getStat = require("../util/get-stat");
const readDir = require("../util/read-dir");

// 生成器函数
module.exports = class Builder {
    constructor(buildConf, context) {
        this.buildConf = buildConf;
        this.context = context;
    }

    // 初始化函数
    async init() {
        // console.log("检查下参数", this.buildConf.id, this.buildConf.conf);
        let files = null;
        try {
            files = await this.readData();
        } catch (error) {
            console.log(error);
        }
        let data = null;
        try {
            data = await this.parseData(files);
        } catch (error) {
            console.log(error);
        }
        const codeArr = this.seedTemplate(data);
        this.createFile(codeArr);
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
