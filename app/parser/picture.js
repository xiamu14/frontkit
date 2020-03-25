const { promisify } = require("util");
const sizeOf = promisify(require("image-size"));

module.exports = async function pictureParser(files) {
    const data = [];
    return new Promise(async resolve => {
        try {
            await size(files, data);
            resolve(data);
        } catch (error) {}
    });
    // return data;
};

async function size(files, data, relative) {
    for (let i = 0; i < files.length; i += 1) {
        const item = files[i];
        if (item.isDirectory) {
            size(
                item.child,
                data,
                relative ? `${relative}/${item.name}` : item.name
            );
        } else {
            // const dimensions = await sizeOf(item.path);
            // item.size = Object.assign({}, item.size, dimensions);
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
            const dimensions = await sizeOf(item.path);
            item.size = Object.assign({}, item.size, dimensions);
        });
        data = result;
    } catch (error) {
        throw new Error(error);
    }
}
