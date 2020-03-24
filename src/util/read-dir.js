const fs = require("fs");
const path = require("path");
module.exports = function readDir(path) {
    return new Promise(resolve => {
        const arr = [];
        fileDisplay(path, arr);
        resolve(arr);
    });
};

// 默认过滤掉一些文件、目录，比如 mac 下的 .DS_Store
const defaultFilter = new RegExp("DS_Store");

function fileDisplay(dirPath, arr) {
    const fileList = fs
        .readdirSync(dirPath)
        .filter(item => !defaultFilter.test(item));

    for (let i = 0; i < fileList.length; i += 1) {
        // 描述此文件/文件夹的对象
        const fileObj = {};
        // 拼接当前文件的路径(上一层路径+当前file的名字)
        const filePath = path.join(dirPath, fileList[i]);
        fileObj.name = fileList[i];
        fileObj.path = filePath;
        // 根据文件路径读取文件信息， 返回一个 fs.Stats 对象
        const stats = fs.statSync(filePath);
        fileObj.size = { value: stats.size, uint: "byte" };
        fileObj.isDirectory = stats.isDirectory();
        
        if (stats.isDirectory()) {
            // 如果是文件夹
            fileObj.suffix = "";
            fileObj.child = [];
            arr.push(fileObj);
            // 递归调用
            fileDisplay(filePath, arr[i].child);
        } else {
            fileObj.suffix = path.extname(fileList[i]).substring(1);
            arr.push(fileObj);
        }
    }
}
