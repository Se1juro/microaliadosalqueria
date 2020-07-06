const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.post('/', usuarioController.registrarUsusario);
router.get('/:id', usuarioController.consultarUsuariosByCodigo);
router.get('/', usuarioController.consultarUsuarios);
module.exports = router;
