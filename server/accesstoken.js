const axios = require('axios');
const Config = require('../main.config');

let AccessToken = function(secret) {
    const tempSecret = secret;
    return {
        getToken : async () => {

            // return 'Q1milmjqdqFujteyvW1DrFe6FgoSr4dr0wud9zEda7BK_1phtszISMpN0Wfr9cGWfJWE6MRnh5daJWF-fujo5yRsQ1Bgyo1A2VgLbtBOUcDkqCaUXdhcWm1KYAJ5L1Ki2aTnJ7eI5P_SuZ2gR02nhfasm2DuLGZAwWkRl7gmndehUjGE8dbAYu8GjAdB4knb-hZvb7NBlYTajeCH0eziEw';
        
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