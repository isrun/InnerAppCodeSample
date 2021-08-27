const FormData = require('form-data');
const axios = require('axios');
const Config = require('../main.config');

function getQueryVariable(url) {
    let query = url.split('?')[1];
    let theRequest = new Object();
    console.log(query);

    strs = query.split("&");
    for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }

    console.log(theRequest);

    return theRequest;
}

module.exports = function (router) {
    router.post('/robot/upload', async function (req, res, next) {

        let { file } = req.files || {};
        console.log(file);

        let { webhook } = req.body || {};
        let webhook_url = webhook || Config.robot;
        let key = getQueryVariable(webhook_url)['key'] ;


        // 组件一个form，用来上传文件
        const form = new FormData();
        form.append('filename', file.name);
        form.append('filelength', file.size);
        form.append('media', file.data, file.name);

        const { data } = await axios.post('https://qyapi.weixin.qq.com/cgi-bin/webhook/upload_media',
            form,
            {
                params: {
                    key,
                    type: 'file'
                },
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });

        console.log(data);
        res.send(data);


    });
    router.post('/robot/send', async function (req, res, next) {

        let { form: request_data, webhook } = req.body;

        let webhook_url = webhook || Config.robot;
        console.log(request_data);

        const { data } = await axios.post(webhook_url, request_data);

        console.log(data);

        res.send(data);


    });

};