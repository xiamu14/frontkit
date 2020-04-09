const fs = require('fs');

module.exports = function mkdir(dir) {
   return new Promise((resolve, reject) => {
       fs.mkdir(dir, (err) => {
           if (err) {
               resolve(false);
           } else {
               resolve(true);
           }
       });
   });
};
