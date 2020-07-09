const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middlewares/loginAuth');
const router = express.Router();

router.post('/', usuarioController.registrarUsusario);
router.get(
  '/:id',
  auth.verificarToken,
  usuarioController.consultarUsuariosByCodigo
);
router.get('/', auth.verificarToken, usuarioController.consultarUsuarios);
router.post(
  '/convert/:id',
  auth.verificarToken,
  usuarioController.makeMicroaliado
);
router.post(
  '/asignmicro/:id',
  auth.verificarToken,
  usuarioController.asignarMicroaliadoToVendedor
);
module.exports = router;
