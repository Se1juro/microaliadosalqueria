const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middlewares/loginAuth');
const adminAuth = require('../middlewares/productoAuth');
const userAuth = require('../middlewares/userAuth');
const router = express.Router();

router.post('/', usuarioController.registrarUsusario);
router.get(
  '/:id',
  auth.verificarToken,
  usuarioController.consultarUsuariosByCodigo
);
router.get(
  '/',
  auth.verificarToken,
  adminAuth.canViewAllProducts,
  usuarioController.consultarUsuarios
);
router.post(
  '/convert/:id',
  auth.verificarToken,
  adminAuth.canViewAllProducts,
  usuarioController.makeMicroaliado
);
router.post(
  '/asignmicro/:id',
  auth.verificarToken,
  adminAuth.canViewAllProducts,
  usuarioController.asignarMicroaliadoToVendedor
);
module.exports = router;
