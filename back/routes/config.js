'use strict'

var express = require('express');
var configController = require('../controllers/configController');

var api = express.Router();
var auth = require('../middlewares/authenticate');


module.exports = api;