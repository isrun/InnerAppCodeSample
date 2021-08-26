var express = require('express');
var router = express.Router();

const contactController = require('../server/contactController');
const mediaController = require('../server/mediaController');
const messageController = require('../server/messageController');

contactController(router);
mediaController(router);
messageController(router);


module.exports = router;
