const fse = require("fs-extra");
const path = require("path");

fse.copy(
    path.resolve(__dirname, "../electron.js"),
    path.resolve(__dirname, "../build/electron.js")
)
    .then(() => console.log("copy electron.js success!"))
    .catch(err => console.error(err));

fse.copy(path.resolve(__dirname, "../app"), path.resolve(__dirname, "../build/app"))
    .then(() => console.log("copy app folder success!"))
    .catch(err => console.error(err));
