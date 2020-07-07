const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.post('/', usuarioController.registrarUsusario);
router.get('/:id', usuarioController.consultarUsuariosByCodigo);
router.get('/', usuarioController.consultarUsuarios);
router.post('/convert/:id', usuarioController.makeMicroaliado);
router.post('/asignmicro/:id', usuarioController.asignarMicroaliadoToVendedor);
module.exports = router;
