"use strict";

var express = require('express');

var inventarioController = require('../controllers/inventarioBodegaController');

var router = express.Router();

var auth = require('../middlewares/loginAuth');

var authPermisos = require('../middlewares/inventarioAuth');

router.get('/:id', auth.verificarToken, authPermisos.canViewInventory, inventarioController.getInventarioByUser);
router.post('/', auth.verificarToken, authPermisos.canCreateInventory, inventarioController.crearInventario);
router.put('/:id', auth.verificarToken, authPermisos.canManageInventory, inventarioController.eliminarProductoInventario);
router.put('/restar/:id', auth.verificarToken, authPermisos.canViewInventory, inventarioController.restarCantidadProducto);
router.put('/agregar/:id', auth.verificarToken, authPermisos.canManageInventory, inventarioController.aumentarExistencia);
module.exports = router;