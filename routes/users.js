var express = require('express');
var router = express.Router();
const FormData = require('form-data');

const axios = require('axios');
const AccessToken = require('../server/accesstoken')();
const addresslistRouteInit = require('../server/contactController');
addresslistRouteInit(router);
router.post('/message/send', async function (req, res, next) {
    let {form:form_parames} = req.body || {};
    console.log(form_parames);
    let request_data  = {
        ...form_parames,
        agentid:1000044,
    };
    request_data.safe = form_parames.safe ? '1' : '0';
    console.log(request_data);    
    const access_token = await AccessToken.getToken();
    const {data} =  await axios.post('https://qyapi.weixin.qq.com/cgi-bin/message/send', 
    request_data,
    {
        params: {
            access_token
        }
        
    });

    console.log(data);

    res.send(data);


});

router.post('/media/upload', async function (req, res, next) {
    
    let {media:file} = req.files || {};
    console.log(req.files);
    
    let {type} = req.body || {} ;
    const access_token = await AccessToken.getToken();

    // 组件一个form，用来上传文件
    const form = new FormData();
    form.append('filename', file.name);
    form.append('filelength', file.size);   
    form.append('media',file.data,file.name);

    const {data} =  await axios.post('https://qyapi.weixin.qq.com/cgi-bin/media/upload', 
    form,
    {
        params: {
            access_token,
            type
        },
        headers: {
            "Content-Type": "multipart/form-data"
        },        
    });

    console.log(data);
    res.send(data);
});




module.exports = router;
