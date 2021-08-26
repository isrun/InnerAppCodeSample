const axios = require('axios');
const Config = require('../main.config');

let AccessToken = {
    getToken : async () => {

        return 'm1URa2m7WaEL9P2ZiRD0FHWlW_UqSRCRsapd-2KvoT8EHor68KX0Yo0uAabKqnOdWNm11BWR2dUkMQWcI-6V_xMWGESZi4jQ5pQJq3x7tjyUl3fKWni26gEpZ7TaNPBeelEGWU4XfcIX3j1CUe7XPvF8e4efLFyesUOzVuSOYEXew3EUvx7mCvOUFppi2R_GijVuSyhAvMlsxX5_VlnvdQ';
    
        let corpid = Config.corpid;
        let corpsecret = Config.secret;
    
        const { data: { access_token } } = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/gettoken', {
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


module.exports = AccessToken;