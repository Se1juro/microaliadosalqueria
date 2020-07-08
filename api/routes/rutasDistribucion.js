const express = require('express');
const produccionController = require('../controllers/inventarioVendedorController');
const router = express.Router();

router.post('/', produccionController.moveToDistribution);
router.put('/', produccionController.finalizarDistribucion);

module.exports = router;
