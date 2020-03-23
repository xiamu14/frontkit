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
        console.log("检查下参数", this.buildConf.id, this.buildConf.conf);
        let files = null;
        try {
            files = await this.readData();
        } catch (error) {
            console.log("这里出错了", error);
        }
        console.log('没有错就显示这样的', files);
        this.parseData(files);
        this.seedTemplate();
        this.createFile();
    }

    // 读取数据源
    // TODO: 读取目录下所有文件吗？
    async readData() {
        let stat = null;
        let files = null;
        const {conf} = this.buildConf;
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
    parseData() {}

    // 投喂模板
    seedTemplate() {}

    // 根据模板字符串生成文件
    createFile() {}
};
