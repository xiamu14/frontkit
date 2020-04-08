const path = require("path");
module.exports = async function pictureParser(files) {
    const data = [];
    return new Promise(async resolve => {
        try {
            await read(files, data);
            resolve(data);
        } catch (error) {}
    });
};

async function read(files, data, relative) {
    for (let i = 0; i < files.length; i += 1) {
        const item = files[i];
        if (item.isDirectory) {
            read(
                item.child,
                data,
                relative ? `${relative}/${item.name}` : item.name
            );
        } else {
            if (relative) {
                item.relative = relative;
            }
            data.push(item);
        }
    }
    // 👆已得到扁平的文件结构
    try {
        // 循环执行
        let result = data.forEach(async item => {
            const object = require(item);
            item.object = object;
        });
        data = result;
    } catch (error) {
        throw new Error(error);
    }
}


