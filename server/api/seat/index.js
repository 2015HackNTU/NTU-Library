'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./seat.controller');
// var auth = require('../../auth/auth.service');

router.post('/getHistory', controller.getSeat);
router.post('/create', controller.create);

module.exports = router;
