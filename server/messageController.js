const axios = require('axios');
const AccessToken = require('./accesstoken')();

module.exports = function(router) {
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
    
};