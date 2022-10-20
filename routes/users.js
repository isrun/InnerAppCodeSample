var express = require('express');
var router = express.Router();
var dayjs = require('dayjs')

const Config = require('../configs/main.config.js');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}


router.get('/config', async function (req, res, next) {
    let access_token = localStorage.getItem('access_token')
    let expire_time = localStorage.getItem('expire_time')

    const corp_id = Config.corp_id;
    const agent_id = Config.agent_id;
    const redirect_uri = encodeURI(Config.site_base + Config.app_path);
    console.log(redirect_uri)
    const login_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${corp_id}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_privateinfo&state=STATE&agentid=${agent_id}#wechat_redirect`

    res.send({
        config: Config,
        access_token,
        expire_time: dayjs.unix(expire_time).format('YYYY/MM/DD HH:mm:ss'),
        redirect_uri,
        login_url
    });
});



const contactController = require('../server/contactController');
const mediaController = require('../server/mediaController');
const messageController = require('../server/messageController');
const robotController = require('../server/robotController');

contactController(router);
mediaController(router);
messageController(router);
robotController(router);

module.exports = router;
