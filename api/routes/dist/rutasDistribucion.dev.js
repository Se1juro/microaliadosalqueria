"use strict";

var express = require('express');

var produccionController = require('../controllers/inventarioVendedorController');

var auth = require('../middlewares/loginAuth');

var distributionAuth = require('../middlewares/distributionAuth');

var router = express.Router();
router.post('/', auth.verificarToken, produccionController.moveToDistribution);
router.put('/', auth.verificarToken, produccionController.finalizarDistribucion);
router.get('/:id', auth.verificarToken, distributionAuth.canFinishDelivery, produccionController.getDistribution);
module.exports = router;