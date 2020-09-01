"use strict";

var express = require('express');

var router = express.Router();

var contactController = require('../controllers/contactController');

router.post('/', contactController.sendEmail);
module.exports = router;