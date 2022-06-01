const express = require('express');
const path = require('path');
const router = express.Router();
const axios = require('axios');
const config = require('../configs/main.config');
const AccessToken = require('../server/accesstoken');

// router.get('/', function(req, res, next) {
//   res.render('index');
// });

router.get(config.home_path, function(req, res, next) {
  const corp_id = config.corp_id;
  const redirect_uri = encodeURI(config.site_base + config.app_path);
  const login_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${corp_id}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
  res.redirect(login_url);
});

router.get(config.app_path,async function(req, res, next) {
  let {code} = req.query;

  let access_token = await AccessToken.getAppToken();
  if(access_token){
    let {data:user_data} = await axios.get(`https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=${access_token}&code=${code}`);
    console.log('获取 user_data 成功',user_data)
    let user_id = user_data.UserId;
    let {data:user_detail_data} = await axios.get(`https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=${access_token}&userid=${user_id}`);
    console.log('获取成员详细信息成功',user_detail_data);
   
    req.session.user = user_detail_data;   
    res.sendFile(path.join(__dirname+'/../vue/dist/index.html'));    

  }
  else{
    res.render('error');
  }
  
});

module.exports = router;
