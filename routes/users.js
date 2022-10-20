var express = require('express');
var router = express.Router();
var dayjs = require('dayjs')

const Config = require('../configs/main.config.js');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}


const contactController = require('../server/contactController');
const mediaController = require('../server/mediaController');
const messageController = require('../server/messageController');
const robotController = require('../server/robotController');

contactController(router);
mediaController(router);
messageController(router);
robotController(router);

module.exports = router;
