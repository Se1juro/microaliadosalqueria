const express = require('express');
const auth = require('../middlewares/loginAuth');
const productoAuth = require('../middlewares/productoAuth');
const productoController = require('../controllers/productoController');
const router = express.Router();

router.get(
  '/',
  auth.verificarToken,
  productoAuth.canViewAllProducts,
  productoController.getAllProducts
);
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
router.post(
  '/',
  auth.verificarToken,
  productoAuth.canViewAllProducts,
  productoController.crearProducto
);
router.put(
  '/:id',
  auth.verificarToken,
  productoAuth.canViewAllProducts,
  productoController.editarProductoByReference
);
router.delete(
  '/:id',
  auth.verificarToken,
  productoAuth.canViewAllProducts,
  productoController.eliminarProductoByReference
);
module.exports = router;
