var express = require('express');
var router = express.Router();


const axios = require('axios');
const parser = require('url-parse');
const getToken = async () => {

    return 'OLC7ZVv5YxwClurcHRsFna-8_QjAoom0Syldmnv8xwsXziUVdq9Lg5XSSA0a1YSk1e6-J8GXtqveO_m5abKqgglLLv6nqtLPYnZfLhOAEgRWBEzFnfgcbeA9UMbHtmE-LP8enM6QovTi0RAII3PYUwtqc1ZwZFMWm46M_WQOv5TpCjRNjtMSZObHyGdzrAIy98WnVm3G0QhZvvIYJaOCLg';

    let corpid = 'ww827c549fa062654e';
    let corpsecret = '***REMOVED***';

    const { data: { access_token } } = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/gettoken', {
        params: {
            corpid,
            corpsecret
        }
    });

    console.log('Access Token OK!');
    console.log(access_token);
    return access_token;
};


router.get('/user/get', async function (req, res, next) {
    console.log('User!!!');

    const query = req.query || {};
    console.log(query);
    console.log('Request query is :')

    const access_token = await getToken();

    const { data } = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/user/get', {
        params: {
            access_token,
            userid: query.userid
        }
    });

    console.log(data);
    res.send(data);


});



router.get('/department/list', async function (req, res, next) {
    const query = req.query || {};
    if (!query.id) {
        query.id = 1;
    }
    const access_token = await getToken();
    console.log(query);
    const { data } = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/department/list', {
        params: {
            access_token,
            id: query.id || ''
        }
    });

    console.log(data);


    let dep = [];
    let department = data.department || [];

    department.forEach(item => {
        if (item.parentid == query.id) {
            dep.push({
                id: item.id,
                name: item.name || '',                
            })
        }
    });


    if (dep.length > 0) {
        for (let index = 0; index < dep.length; index++) {
            let element = dep[index];
            if (department.some(item => {
                return item.parentid == element.id
            })) {
                element.children = [{
                    label: '0',
                }];

                element.leaf = false;

            } else {

                element.leaf = true;
            }
        }
    }



    console.log(dep);
    res.send(dep);


});





module.exports = router;
