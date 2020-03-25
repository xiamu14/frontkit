const low = require('lowdb');
const path = require('path');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(path.resolve(__dirname, '../db/lowdb.json'));
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ builderConf: [], user: {} })
  .write();

module.exports = db;
