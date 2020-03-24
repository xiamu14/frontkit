const Builder = require("../src/builder");
const conf = {
    id: "build_1",
    conf: {
        dataPath:
            "/Users/ben/Documents/w/code/myproject/magic-code/__test__/data/icons",
        parse: { type: "picture" },
        templateList: [
            {
                templateFilePath:
                    "/Users/ben/Documents/w/code/myproject/magic-code/__test__/template/icon/index.js",
                targetFileName: "index.tsx"
            },
            {
                templateFilePath:
                    "/Users/ben/Documents/w/code/myproject/magic-code/__test__/template/icon/style.js",
                targetFileName: "index.css"
            },
            {
                templateFilePath:
                    "/Users/ben/Documents/w/code/myproject/magic-code/__test__/template/icon/type.js",
                targetFileName: "type.ts"
            }
        ],
        info: {
            name: "测试图标组件生成器",
            desc:
                "根据图标文件生成图标组件，减少繁琐操作，已经确保按需引用【React+typescript】"
        },
        targetPath: "/Users/ben/Documents/w/code/myproject/magic-code/__test__/data"
    }
};

const builder = new Builder(conf);
builder.init();