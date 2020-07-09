const express = require('express');
const produccionController = require('../controllers/inventarioVendedorController');
const auth = require('../middlewares/loginAuth');
const router = express.Router();

router.post('/', auth.verificarToken, produccionController.moveToDistribution);
router.put(
  '/',
  auth.verificarToken,
  produccionController.finalizarDistribucion
);

module.exports = router;
