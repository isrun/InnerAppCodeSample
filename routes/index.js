const express = require('express');

const router = express.Router();
var dayjs = require('dayjs')
const axios = require('axios');
const Config = require('../configs/main.config.js');
const AccessToken = require('../server/accesstoken');
const { corp_id } = require('../configs/main.config.js');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

function getLoginURL() {
    const corp_id = Config.corp_id;
    const redirect_uri = encodeURI(Config.site_base + Config.app_path);
    const login_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${corp_id}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
    return login_url
}

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get(Config.home_path, function (req, res, next) {
    const login_url = getLoginURL;
    res.redirect(login_url);
});

router.get(Config.app_path, async function (req, res, next) {
    let { code } = req.query;
    if (code) {
        let access_token = await AccessToken.getToken();
        if (access_token) {
            let { data: user_data } = await axios.get(`https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=${access_token}&code=${code}`);
            console.log('获取 user_data 成功', user_data)
            let user_id = user_data.UserId;
            let { data: user_detail_data } = await axios.get(`https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=${access_token}&userid=${user_id}`);
            console.log('获取成员详细信息成功', user_detail_data);
            req.session.user = user_detail_data;
        }
        else {
            res.render('error');
        }
    }

    let access_token = localStorage.getItem('access_token')
    let expire_time = localStorage.getItem('expire_time')

    let user = {};
    if (req.session.user) {
        user = req.session.user
    }

    const corp_id = Config.corp_id;
    const agent_id = Config.agent_id;
    const redirect_uri = encodeURI(Config.site_base + Config.app_path);

    const login_url = getLoginURL();

    let setting = {
        user: user,
        config: Config,
        access_token,
        expire_time: dayjs.unix(expire_time).format('YYYY/MM/DD HH:mm:ss'),
        redirect_uri,
        login_url
    };
    res.render('../vue/dist/index.ejs', { global_data_string: JSON.stringify(setting) });


});

module.exports = router;
