const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middlewares/loginAuth');
const adminAuth = require('../middlewares/productoAuth');
const userAuth = require('../middlewares/userAuth');
const router = express.Router();

router.post('/', userAuth.datosRegister, usuarioController.registrarUsusario);
router.get(
  '/disponibles',
  auth.verificarToken,
  adminAuth.canViewAllProducts,
  usuarioController.usersActives
);
router.get(
  '/',
  auth.verificarToken,
  adminAuth.canViewAllProducts,
  usuarioController.consultarUsuarios
);
router.get(
  '/:id',
  auth.verificarToken,
  userAuth.canViewUser,
  usuarioController.consultarUsuariosByCodigo
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
router.put(
  '/delete/:id',
  auth.verificarToken,
  adminAuth.canViewAllProducts,
  adminAuth.errorDeleteSelf,
  usuarioController.deleteUser
);
module.exports = router;
