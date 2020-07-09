const express = require('express');
const inventarioController = require('../controllers/inventarioBodegaController');
const router = express.Router();
const auth = require('../middlewares/loginAuth');

router.get(
  '/:id',
  auth.verificarToken,
  inventarioController.getInventarioByUser
);
router.post('/', auth.verificarToken, inventarioController.crearInventario);
router.put(
  '/:id',
  auth.verificarToken,
  inventarioController.eliminarProductoInventario
);
router.put(
  '/restar/:id',
  auth.verificarToken,
  inventarioController.restarCantidadProducto
);
router.put(
  '/agregar/:id',
  auth.verificarToken,
  inventarioController.aumentarExistencia
);
module.exports = router;
