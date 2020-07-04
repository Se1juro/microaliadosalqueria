const express = require('express');
const productoController = require('../controllers/productoController');
const router = express.Router();

router.get('/', productoController.getAllProducts);
router.get('/disponibles', productoController.getProductsActive);
router.get('/:id', productoController.getProductByReference);
router.post('/', productoController.crearProducto);
router.put('/:id', productoController.editarProductoByReference);
router.delete('/:id', productoController.eliminarProductoByReference);
module.exports = router;
