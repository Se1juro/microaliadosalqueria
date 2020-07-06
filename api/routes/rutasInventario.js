const express = require('express');
const inventarioController = require('../controllers/inventarioBodegaController');
const router = express.Router();

router.get('/:id', inventarioController.getInventarioById);
router.post('/', inventarioController.crearInventario);
router.put('/:id', inventarioController.eliminarProductoInventario);
module.exports = router;
