const express = require('express');
const productoController = require('../controllers/productoController');
const router = express.Router();

router.get('/', productoController.getAllProducts);
router.get('/:id', productoController.getProductByReference);
module.exports = router;
