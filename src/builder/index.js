// 生成器函数
module.exports = class Builder {
    constructor(buildConf) {
        this.buildConf = buildConf;
    }

    // 初始化函数
    init() {
        console.log('检查下参数', this.buildConf.id, this.buildConf.conf);
    }

    // 读取数据源
    readData() {

    }

    // 解析数据
    parseData() {

    }

    // 投喂模板
    seedTemplate() {

    }

};
