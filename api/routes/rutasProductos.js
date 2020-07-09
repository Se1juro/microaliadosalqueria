const express = require('express');
const auth = require('../middlewares/loginAuth');
const productoController = require('../controllers/productoController');
const router = express.Router();

router.get('/', auth.verificarToken, productoController.getAllProducts);
router.get(
  '/disponibles',
  auth.verificarToken,
  productoController.getProductsActive
);
router.get(
  '/:id',
  auth.verificarToken,
  productoController.getProductByReference
);
router.post('/', auth.verificarToken, productoController.crearProducto);
router.put(
  '/:id',
  auth.verificarToken,
  productoController.editarProductoByReference
);
router.delete(
  '/:id',
  auth.verificarToken,
  productoController.eliminarProductoByReference
);
module.exports = router;
