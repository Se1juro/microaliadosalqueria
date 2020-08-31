"use strict";

var express = require('express');

var produccionController = require('../controllers/inventarioVendedorController');

var auth = require('../middlewares/loginAuth');

var router = express.Router();
router.post('/', auth.verificarToken, produccionController.moveToDistribution);
router.put('/', auth.verificarToken, produccionController.finalizarDistribucion);
router.get('/:id', auth.verificarToken, produccionController.getDistribution);
module.exports = router;