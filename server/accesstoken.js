const axios = require('axios');
const Config = require('../main.config');

let AccessToken = function(secret) {
    const tempSecret = secret;
    return {
        getToken : async () => {

            return 'lXRg_-GSu_twnNQ78ipfy9M9FbrGbNCTvG83XGnfCu-OAb8vkv59ICud4VDcP8xZoz50yV71jU3_UsJ-peLju1RQjDidPeHalLYt1KwQiNfEy0nD22w_hFYMrsanXQKo162pvQ3aN6deZPAtNppb1-0yI_DM088udQq7wmyreEdnWPCQegAsCkzC7N5QJl-LapZv2VM5DbStQ6CzHj9cQw';
        
            let corpid = Config.corpid;
            let corpsecret = tempSecret || Config.secret;
        
            const {data: {
                access_token
            }} = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/gettoken', {
                params: {
                    corpid,
                    corpsecret
                }
            });
    
            console.log('-----------------------');
            console.log('Access Token OK!');
            console.log(access_token);
            console.log('-----------------------');
            return access_token;
        }
    }
};


module.exports = AccessToken;