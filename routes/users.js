var express = require('express');
var router = express.Router();


const axios = require('axios');
const parser = require('url-parse');
const getToken = async () => {

    return 'rHPM9RmmL1Rj8bT4LAAzbpZp0ivJr16klksNlSoUNRykEmC8s8IIq_5wmAb3A4zoO7ESHv-BEXMBY-Zk7wxDCCG6rSWH0ixKzxt7hERooIAwmieKUk_iV3Tq5gR9KsgILOQ5OQgLyeaBJZKL8iWWMDE35KTnqpo26Ebj05VKszf_fMYZY2LNxdbSUFaFhVfTu5hwBIljaMVS7qiqQaAkVA';

    let corpid = 'ww827c549fa062654e';
    let corpsecret = '***REMOVED***';

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


    let filter_departments = []
    const { data:{department:departmentlist} } = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/department/list', {
        params: {
            access_token,
            id: query.id || ''
        }
    });

    departmentlist.forEach(item => {
        if (item.parentid == query.id) {
            filter_departments.push({
                id: item.id,
                name: item.name || '',
                type: 'department'
            })
        }
    });
    // if (filter_departments.length > 0) {
    //     for (let index = 0; index < filter_departments.length; index++) {
    //         let element = filter_departments[index];
    //         if (departmentlist.some(item => {
    //             return item.parentid == element.id
    //         })) {
    //             // element.leaf = false;

    //         } else {
    //             // element.leaf = true;
    //         }
    //     }
    // }


    const { data:{userlist} } = await axios.get('https://qyapi.weixin.qq.com/cgi-bin/user/simplelist', {
        params: {
            access_token,
            department_id: query.id || '',
            fetch_child: 0
        }
    });

    let filter_users = userlist.map(user => {
        return {
            id:user.userid || '',
            name : user.name || '',
            leaf : true,
            type : 'user'
        }
    });

    console.log(filter_departments);
    console.log(filter_users);
    res.send([].concat(filter_users,filter_departments));


});





module.exports = router;
