const low = require("lowdb");
const path = require("path");
const isDev = require("electron-is-dev");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(
    path.resolve(
        __dirname,
        isDev ? "../db/lowdb-dev.json" : "../db/lowdb.json"
    )
);
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ builderConf: [], user: {} }).write();

module.exports = db;
