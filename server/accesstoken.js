const axios = require('axios');
const Config = require('../configs/main.config');
const fs = require('fs');
const path = require('path');

// token 缓存文件存储位置
const token_path = '../temp/tokens.json';

// 判断 token 是否过期
let _isExpire = function (create_time, expire_time) {
    const current = Math.floor(Date.now() / 1000);
    return create_time + expire_time < current;
}

// 获取 token 
let _getTokenWithType = async function (type) {
    
    let tokens = {};
    let corp_id = Config.corp_id;
    // 
    if(!type){type = 'app'};
    let secret = Config[`${type}_secret`];

    // 先尝试从缓存中读取出token
    try {
        tokens = JSON.parse(fs.readFileSync(path.join(__dirname, token_path), {
            encoding: 'utf-8',
        }));
    } catch (err) {
        // 缓存文件读取失败
        console.error(err)
    }
    
    if (!tokens[type] || _isExpire(tokens[type].create_time, tokens[type].expire_time)) {
        // 如果缓存中没有 token，或者 token 过期        
        console.log(`重新获取 ${type} access_token`)
        // 发起请求，获取 access_token
        const { data: {
            access_token, expires_in
        } } = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/gettoken', {
            params: {
                corpid:corp_id,
                corpsecret:secret
            }
        });
        // 重新写入 access_token
        tokens[type] = {};
        tokens[type].create_time = Math.floor(Date.now() / 1000);
        tokens[type].expire_time = expires_in;
        tokens[type].token = access_token;
        fs.writeFileSync(path.join(__dirname, token_path), JSON.stringify(tokens), {
            encoding: 'utf-8'
        });
        // 返回 access_token
        console.log(`获取 ${type} access_token 成功`,access_token);        
        return access_token;
    } else {
        // 从缓存中读取
        console.log(`从缓存中读取 ${type} access_token`, tokens[type].token);
        return tokens[type].token;
    }
}

module.exports ={
    // 获取普通应用的 Token
    async getAppToken(){
        return await _getTokenWithType('app');
    },
    // 获取通讯录的 Token
    async getContactToken(){
        return await _getTokenWithType('contact');
    }
    
} ;