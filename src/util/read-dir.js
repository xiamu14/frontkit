const fs = require('fs');

module.exports = function readDir(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(new Error('Directory does not exist.'));
      } else {
        resolve(files);
      }
    });
  });
};
