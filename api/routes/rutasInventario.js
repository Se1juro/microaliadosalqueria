const express = require('express');
const inventarioController = require('../controllers/inventarioBodegaController');
const router = express.Router();

router.get('/:id', inventarioController.getInventarioByUser);
router.post('/', inventarioController.crearInventario);
router.put('/:id', inventarioController.eliminarProductoInventario);
router.put('/restar/:id', inventarioController.restarCantidadProducto);
module.exports = router;
