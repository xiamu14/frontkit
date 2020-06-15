const { NodeVM } = require("vm2");
const { join } = require("path");
const fs = require("fs");

const vm = new NodeVM({
  sandbox: {},
});

const code = fs.readFileSync(join(__dirname, './template/icon/index.js'));

console.log(vm.run(code)({}));
