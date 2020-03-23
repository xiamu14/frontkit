const Builder = require("../src/builder");
const conf = {
    id: "build_1",
    conf: {
        dataPath: "/Users/ben/Documents/w/code/myproject/magic-code/src/assets",
        type: "picture",
        templateList: [
            {
                templateFilePath:
                    "/Users/ben/Documents/w/code/myproject/magic-code/src/assets/logo.svg",
                targetFileName: "file.scss"
            }
        ],
        info: {
            name: "测试图标组件生成器",
            desc:
                "根据图标文件生成图标组件，减少繁琐操作，已经确保按需引用【React+typescript】"
        }
    }
};

const builder = new Builder(conf);
builder.init();
