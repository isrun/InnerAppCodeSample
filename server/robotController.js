const axios = require('axios');

module.exports = function(router) {
    router.post('/robot/send', async function (req, res, next) {
        
        let request_data  = {
        };
        
        console.log(request_data);
        
        const {data} =  await axios.post('https://qyapi.weixin.qq.com/cgi-bin/message/send', 
        request_data);
    
        console.log(data);
    
        res.send(data);
    
    
    });
    
};