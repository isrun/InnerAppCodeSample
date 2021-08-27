const axios = require('axios');
const Config = require('../main.config');

module.exports = function(router) {
    router.post('/robot/send', async function (req, res, next) {
        
        let {form:request_data} = req.body;
        
        
        console.log(request_data);
        
        const {data} =  await axios.post(Config.robot, request_data);
    
        console.log(data);
    
        res.send(data);
    
    
    });
    
};