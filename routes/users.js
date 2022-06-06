var express = require('express');
var router = express.Router();

const contactController = require('../server/contactController');
const mediaController = require('../server/mediaController');
const messageController = require('../server/messageController');
const customerController = require('../server/customerController');
const robotController = require('../server/robotController');

contactController(router);
mediaController(router);
messageController(router);
customerController(router);
robotController(router);

module.exports = router;
