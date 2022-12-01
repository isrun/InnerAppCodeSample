const shell = require("shelljs");
// yarn add shelljs -D --registry https://registry.npm.taobao.org/
const fs = require("fs");
const path = require("path");
fs.readFile(path.join(__dirname, '../package.json'), 'utf8', function (err, packagejson) {
    var dataStart = "01";
    var dataZhongjian = "02";
    var person = packagejson.toString();
    packageData = JSON.parse(person);
    //把数据读出来后,进行数据修改
    // console.log(packageData.version);
    // console.log(packageData);
    var dataend = packageData.version.substring(6, 8);
    // 每执行一次，最小版本号加一
    var dataend = parseInt(dataend) + 1;
    // console.log(dataend)
    if (dataend < 10) {
        dataend = "0" + dataend
    };
    // console.log(dataStart);
    var version = `${dataStart}.${dataZhongjian}.${dataend}`;
    // console.log("获得版本号" + version);
    packageData.version = version;
    // console.log(packageData);
    // data2 = JSON.parse(data2);
    let Str_ans = JSON.stringify(packageData, null, 4);
    // console.log(Str_ans);
    let write_json_path = path.join(process.cwd(), './package.json');
    fs.writeFileSync(write_json_path, Str_ans, 'utf8', (err) => {
        if (err) throw err;
    });
    // 版本号修改好以后，进行Git推送
    var stringGit = `git commit -m '快速提交,版本号为${packageData.version}'`;
    console.log(stringGit);
    // // shell.exec('../../../');
    shell.exec('git add .');
    shell.exec(stringGit);
    shell.exec('git push');
});
