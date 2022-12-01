const shells = require("shelljs");
const fs = require("fs");
const path = require("path");
// 删除指定路径的文件夹
shells.rm('-rf', '../shawnAdmin/test/verifytypes/');
// 创建  路径   文件夹
shells.mkdir('-p', '../shawnAdmin/test/verifytypes/dist');
// 复制文件夹到指定位置
shells.cp('-R', 'dist', '../shawnAdmin/test/verifytypes/');
shells.cp('-R', './package.json', '../shawnAdmin/test/verifytypes');
// 切换到指定目录
shells.cd('../shawnAdmin/test/verifytypes');
shells.exec('npm i ');

